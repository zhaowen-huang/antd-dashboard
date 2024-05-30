import { useNavigate } from "@tanstack/react-router";
import { AccessToken, LoginService } from "../api/services";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { AxiosError } from "axios";

const isLoggedIn = () => {
    return localStorage.getItem("access_token") !== null;
};
export { isLoggedIn };

const useAuth = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const login = async (data: AccessToken) => {
        const response = await LoginService.loginAccessToken(data);
        localStorage.setItem("access_token", response.access_token);
    };

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            navigate({ to: "/" });
        },
        onError: (error: AxiosError) => {
            const { data } = error.response!;
            const { detail } = data as { detail: string };
            messageApi.error(detail);
        },
    });

    const logout = () => {
        localStorage.removeItem("access_token");
        navigate({ to: "/login" });
    };

    return {
        loginMutation,
        logout,
        error,
        resetError: () => setError(null),
        contextHolder,
    };
};
export default useAuth;
