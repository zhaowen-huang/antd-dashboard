import { createFileRoute } from "@tanstack/react-router";
import { Menu, MenuProps } from "antd";
import { useState } from "react";

export const Route = createFileRoute("/_layout/settings")({
    component: Settings,
});
const items_node = {
    profile: <>this is profile</>,
    password: <>this is password</>,
    dangerzone: <>this is dangerzone</>,
};
const items = [
    {
        label: "My profile",
        key: "profile",
    },
    {
        label: "Password",
        key: "password",
    },
    {
        label: <div className=" text-red-500">Danger Zone</div>,
        key: "dangerzone",
    },
];
function Settings() {
    const [current, setCurrent] = useState("profile");
    const Content = items_node[current as keyof typeof items_node];
    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };
    return (
        <div className=" flex flex-col">
            <div className=" self-center text-2xl">Users Setting</div>
            <div>
                <Menu
                    mode="horizontal"
                    onClick={onClick}
                    selectedKeys={[current]}
                    items={items}
                    disabledOverflow
                />
            </div>
            {Content}
        </div>
    );
}
