import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL: "http://localhost:3000/api",
});

API.interceptors.request.use(
    (config) => {
        console.log("Request Config:", config);
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
        console.log("Response Data:", response.data);
        return response;
    },
    (error) => {
        console.error("Response error:", error.response?.data || error);
        return Promise.reject(error);
    }
);

export default API;
