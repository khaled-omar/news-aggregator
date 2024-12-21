import axios from 'axios';
import {toast} from "material-react-toastify";
import cookies from "./Cookies.js";

const httpConfig = {
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 10000,
    paramsSerializer: {
        indexes: true, 
    },
    headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
    },
};

const HttpClient = axios.create(httpConfig);

HttpClient.interceptors.request.use(
    (config) => {
        const token = cookies.get('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

HttpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.data?.status.code === 422) {
            toast.error(error.response.data?.status?.message ?? error.response.data?.status?.errors)
        }
        return Promise.reject(error);
    }
);

export default HttpClient;
