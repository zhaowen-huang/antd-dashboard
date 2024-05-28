import { createFileRoute, redirect } from "@tanstack/react-router";
import { isLoggedIn } from "../hooks/useAuth";

export const Route = createFileRoute("/_layout")({
    component: () => <div>Hello /_layout!</div>,
    beforeLoad: async () => {
        console.log(isLoggedIn());
        if (!isLoggedIn()) {
            throw redirect({
                to: "/login",
            });
        }
    },
});
