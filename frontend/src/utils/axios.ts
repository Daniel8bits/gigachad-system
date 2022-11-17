import axios, { AxiosError} from 'axios';
import type {AxiosRequestConfig, Method} from 'axios';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:5000" : "http://localhost:5000"
});

instance.defaults.headers.common.Authorization = window.localStorage.getItem("Token_Auth") ?? "";

//instance.interceptors.response.use(({ data }) => data, (error) => Promise.reject(error));

export default instance;
export {AxiosError}
export type {AxiosRequestConfig, Method}