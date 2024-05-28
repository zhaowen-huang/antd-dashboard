import axios, { AxiosError, AxiosResponse } from "axios";

const token = localStorage.getItem("access_token") || "";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.defaults.headers.common = { Authorization: `bearer ${token}` };
const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: unknown = {}) =>
        axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: unknown = {}) =>
        axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string, body: unknown = {}) =>
        axios.delete<T>(url, { data: body }).then(responseBody),
    download: <T>(url: string, type: "get" | "post") =>
        axios[type]<T>(url, {
            responseType: "blob",
        }).then((response: AxiosResponse) => response.data),
};
axios.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
        const { data, status } = error.response!;
        switch (status) {
            case 400:
                console.error(data);
                break;

            case 401:
                console.error("unauthorised");
                break;

            case 404:
                console.error("/not-found");
                break;

            case 500:
                console.error("/server-error");
                break;
        }
        return Promise.reject(error);
    }
);
export type AccessToken = { username: string; password: string };
export type Token = {
    access_token: string;
    token_type?: string;
};
export const LoginService = {
    loginAccessToken: (formData: AccessToken) => {
        const form = new FormData();
        form.append("username", formData.username);
        form.append("password", formData.password);
        return request.post<Token>("/api/v1/login/access-token", form);
    },
};
