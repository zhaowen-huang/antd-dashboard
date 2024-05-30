import DropDownItem from "@/components/DropDown/DropDownItem";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { Dropdown, Button } from "antd";
function DropDownMenu() {
    const navigate = useNavigate();
    const items = [
        {
            key: "1",
            label: (
                <DropDownItem
                    Icon={UserOutlined}
                    text="My profile"
                    onClick={() => navigate({ to: "/settings" })}
                />
            ),
        },
        {
            key: "2",
            label: (
                <DropDownItem
                    Icon={LoginOutlined}
                    text="Log out"
                    onClick={() => console.log("qwe")}
                    isDanger
                />
            ),
        },
    ];
    return (
        <div className=" fixed top-4 right-4">
            <Dropdown menu={{ items }} placement="bottomLeft">
                <Button type="primary" shape="circle" size="large">
                    <UserOutlined />
                </Button>
            </Dropdown>
        </div>
    );
}

export default DropDownMenu;
