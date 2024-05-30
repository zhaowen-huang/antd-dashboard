import { FacebookOutlined } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import useAuth from "@/hooks/useAuth";
import { AccessToken } from "@/api/services";

export const Route = createFileRoute("/login")({
    component: Login,
});

function Login() {
    const { loginMutation, contextHolder } = useAuth();
    const onFinish: FormProps<AccessToken>["onFinish"] = (values) => {
        loginMutation.mutate(values);
    };
    return (
        <div className=" w-full h-[100vh] flex justify-center items-center flex-col">
            {contextHolder}
            <h1 className=" text-5xl m-5">
                <FacebookOutlined />
                Dashboard
            </h1>
            <div className="flex justify-center items-center w-fit h-fit">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
