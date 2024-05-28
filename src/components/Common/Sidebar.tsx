import React from "react";
import {
    LaptopOutlined,
    SettingOutlined,
    HomeOutlined,
    FacebookOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "@tanstack/react-router";

const { Sider } = Layout;

const items: MenuProps["items"] = [
    {
        key: `/`,
        icon: React.createElement(HomeOutlined),
        label: "Dashboard",
    },
    {
        key: `items`,
        icon: React.createElement(LaptopOutlined),
        label: "Items",
    },
    {
        key: `settings`,
        icon: React.createElement(SettingOutlined),
        label: "User Settings",
    },
];

const Sidebar: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    const onClick: MenuProps["onClick"] = (e) => {
        navigate({ to: `/${e.key}` });
    };
    return (
        <Sider
            width={200}
            style={{ background: colorBgContainer }}
            className="  flex"
        >
            <div className=" bg-gray-100 p-2 rounded-xl max-h-[100vh] h-full min-w-[220px]">
                <div className=" text-2xl text-center my-4 font-semibold">
                    <FacebookOutlined className="mx-1" />
                    Dashboard
                </div>
                <Menu
                    className="bg-gray-100 rounded-xl"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    items={items}
                    onClick={onClick}
                />
            </div>
        </Sider>
    );
};

export default Sidebar;
