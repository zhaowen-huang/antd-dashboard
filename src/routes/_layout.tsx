import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { isLoggedIn } from "@/hooks/useAuth";
import Sidebar from "@/components/Common/Sidebar";
import { Layout as AntdLayout, theme } from "antd";

export const Route = createFileRoute("/_layout")({
    component: Layout,
    beforeLoad: async () => {
        console.log(isLoggedIn());
        if (!isLoggedIn()) {
            throw redirect({
                to: "/login",
            });
        }
    },
});
const { Content } = AntdLayout;

function Layout() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <AntdLayout>
            <AntdLayout className=" max-h-[100vh] h-[100vh] bg-white flex p-3">
                <Sidebar />
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </AntdLayout>
        </AntdLayout>
    );
}

export default Layout;
