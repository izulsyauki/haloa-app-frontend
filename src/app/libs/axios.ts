import axios from "axios";
import Cookies from "js-cookie";
import { router } from "../Router";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL_DEV || import.meta.env.VITE_API_URL,
});

API.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("Response error:", error.response?.data || error);
        if (error.response?.status === 500) {
            router.navigate("/error");
        }
        return Promise.reject(error);
    }
);

export default API;
