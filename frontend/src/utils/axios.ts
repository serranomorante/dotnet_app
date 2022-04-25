import axios, { AxiosRequestConfig } from "axios";

const axiosRequestConfiguration: AxiosRequestConfig = {
    baseURL: "http://localhost"
}

const axiosInstance = axios.create(axiosRequestConfiguration);

export default axiosInstance;