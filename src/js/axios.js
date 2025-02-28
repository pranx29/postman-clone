import axios from "axios";
import { filesize } from "filesize";

const api = axios.create({
    baseURL: "",
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        config.metadata = { startTime: new Date() };
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        response.config.metadata.endTime = new Date();
        response.duration =
            response.config.metadata.endTime -
            response.config.metadata.startTime;

        response.size = filesize(
            JSON.stringify(response.data).length +
                JSON.stringify(response.headers).length
        ).replace("kB", "KB");

        return response;
    },
    (error) => {
        error.config.metadata.endTime = new Date();
        error.duration =
            error.config.metadata.endTime - error.config.metadata.startTime;
        if (error.response && error.response.data && error.response.headers) {
            error.size = filesize(
            JSON.stringify(error.response.data).length +
                JSON.stringify(error.response.headers).length
            ).replace("kB", "KB");
        }

        return Promise.reject(error);
    }
);

export default api;
