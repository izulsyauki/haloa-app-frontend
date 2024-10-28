import axios from "axios";
import Cookies from "js-cookie";
const API = axios.create({
    baseURL: "http://localhost:3000/api",
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
        return Promise.reject(error);
    }
);

export default API;
