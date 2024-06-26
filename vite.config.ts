import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/api": {
                target: "http://localhost",
                changeOrigin: true,
            },
        },
    },
    plugins: [react(), TanStackRouterVite()],
    resolve: {
        alias: [{ find: "@", replacement: "/src" }],
    },
});
