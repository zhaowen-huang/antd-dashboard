import { Button, Form, Input, Modal, message } from "antd";
import { ItemsService } from "@/api/services";
import { ItemCreate } from "@/api/services.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
function AddItem({
    isOpen,
    setClose,
}: {
    isOpen: boolean;
    setClose: () => void;
}) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const handleCancel = () => {
        setClose();
    };
    const queryClient = useQueryClient();
    const handleOk = () => {
        mutation.mutate({
            title: form.getFieldValue("title"),
            description: form.getFieldValue("description"),
        });
    };
    const mutation = useMutation({
        mutationFn: (data: ItemCreate) => ItemsService.createItem(data),
        onSuccess: () => {
            messageApi.info("Created");
            setClose();
            form.resetFields();
        },
        onError: () => {
            messageApi.error("Failed to Created");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] });
        },
    });
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
                <Form form={form} layout="vertical" autoComplete="off">
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
                        <Input placeholder="Description" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default AddItem;
