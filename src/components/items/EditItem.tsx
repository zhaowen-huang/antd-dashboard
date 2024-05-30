import { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { Item, ItemUpdate } from "@/api/services.types";
import { ItemsService } from "@/api/services";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useMessage from "antd/es/message/useMessage";
function EditItem({
    isOpen,
    setClose,
    item,
}: {
    item: Item | null;
    isOpen: boolean;
    setClose: () => void;
}) {
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = useMessage();
    const mutation = useMutation({
        mutationFn: ({ id, item }: { id: number; item: ItemUpdate }) =>
            ItemsService.updateItem(id, item),
        onSuccess: () => {
            messageApi.info("Successful");
            setClose();
        },
        onError: () => {
            messageApi.error("Failed to update");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
        },
    });

    const [form] = Form.useForm();
    useEffect(() => {
        if (item)
            form.setFieldsValue({
                title: item?.title,
                description: item?.description,
            });
    }, [form, item]);

    const handleOk = () => {
        if (item?.id) {
            mutation.mutate({
                id: item.id,
                item: {
                    title: form.getFieldValue("title"),
                    description: form.getFieldValue("description"),
                },
            });
        }
    };

    const handleCancel = () => {
        setClose();
    };

    return (
        <>
            <Modal
                centered
                open={isOpen}
                title="Add Item"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        loading={mutation.isPending}
                        onClick={handleOk}
                    >
                        Save
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                ]}
            >
                {contextHolder}
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{
                        title: item?.title,
                        description: item?.description,
                    }}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Description" value="description" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default EditItem;
