/* eslint-disable @typescript-eslint/no-unused-vars */
import { ItemsService } from "@/api/services";
import { Item } from "@/api/services.types";
import AddItem from "@/components/items/AddItem";
import EditItem from "@/components/items/EditItem";
import useDisclosure from "@/hooks/useDisclosure";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Popconfirm, Table, message } from "antd";
import { useState } from "react";

export const Route = createFileRoute("/_layout/items")({
    component: Items,
});

function Items() {
    const { data } = useQuery({
        queryKey: ["items"],
        queryFn: () => ItemsService.readItems({}),
    });
    const queryClient = useQueryClient();

    const addItemModal = useDisclosure();
    const editItemModal = useDisclosure();
    const [item, setItem] = useState<Item | null>(null);
    const mutation = useMutation({
        mutationFn: (id: string) => ItemsService.deleteItem({ id }),
        onSuccess: (data) => {
            const { message: rsp } = data as { message: string };
            message.success(rsp);
        },
        onError: () => {
            message.success(`item has not been deleted `);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["items"],
            });
        },
    });
    return (
        <div>
            <AddItem
                isOpen={addItemModal.isOpen}
                setClose={addItemModal.setClose}
            />
            <EditItem
                item={item}
                isOpen={editItemModal.isOpen}
                setClose={editItemModal.setClose}
            ></EditItem>
            <div className=" flex items-center flex-col">
                <div className=" text-2xl"> Items Management</div>
            </div>
            <div className="mt-[5vh] mx-[5vw] flex flex-col">
                <div className=" flex flex-row items-center">
                    <Button
                        className=" flex items-center max-w-fit mr-5 my-5"
                        onClick={() => {
                            addItemModal.setOpen();
                        }}
                    >
                        <PlusCircleOutlined />
                        Add item
                    </Button>
                </div>
                <Table
                    dataSource={data?.data.map((e) => ({
                        key: e.id,
                        ...e,
                    }))}
                    columns={[
                        {
                            title: "ID",
                            dataIndex: "id",
                            key: "id",
                        },
                        {
                            title: "Title",
                            dataIndex: "title",
                            key: "title",
                        },
                        {
                            title: "Description",
                            dataIndex: "description",
                            key: "description",
                        },
                        {
                            title: "Action",
                            key: "action",
                            render: (_, record) => {
                                return (
                                    <>
                                        <a
                                            onClick={() => {
                                                setItem(record);
                                                editItemModal.setOpen();
                                            }}
                                        >
                                            Edit
                                        </a>
                                        <Popconfirm
                                            title="Delete Item
                                            "
                                            description="Are you sure? You will not be able to undo this action."
                                            onConfirm={() => {
                                                mutation.mutate(
                                                    record.id.toString()
                                                );
                                            }}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <a className="ml-2 text-red-700">
                                                Delete
                                            </a>
                                        </Popconfirm>
                                    </>
                                );
                            },
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default Items;
