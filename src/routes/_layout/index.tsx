import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
    component: Dashboard,
});

function Dashboard() {
    return (
        <div className=" m-10">
            <div className=" text-2xl"> Hi, Zhaowen Huang 👋🏼</div>
            <div className=" text-xl mt-2">
                Welcome back, nice to see you again!
            </div>
        </div>
    );
}
