import axios, { AxiosError} from 'axios';
import type {AxiosRequestConfig, Method} from 'axios';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:5000" : "http://localhost:5000"
});

instance.defaults.headers.common.Authorization = window.localStorage.getItem("Token_Auth") ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcGYiOiI3NDEuNzY0LjY1MC02OSIsImlhdCI6MTY2NjExNzQ0MSwiZXhwIjoxNjY2MjAzODQxfQ.gCcM7mFoOLFUGtOaT0W16ke1o-TtTM-V_5MriaxKtKk";

//instance.interceptors.response.use(({ data }) => data, (error) => Promise.reject(error));

export default instance;
export {AxiosError}
export type {AxiosRequestConfig, Method}