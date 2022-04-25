import axios, { AxiosRequestConfig } from "axios";

const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: process.env.API_URL,
};

const axiosInstance = axios.create(axiosRequestConfiguration);

export default axiosInstance;
