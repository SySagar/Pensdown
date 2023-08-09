
import axios, { AxiosInstance } from "axios";
import {LoginTypes,RegisterTypes} from "./types";

const APIInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API as string,
  });
  
  const AuthorizedAPIInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API as string,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  AuthorizedAPIInstance.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") as string}`;
    return config;
  });

const APITMethods = {

    auth:{
        login: async (data: LoginTypes) => await AuthorizedAPIInstance.post("/auth/login", data),
        register: async (data: RegisterTypes) => {return await APIInstance.post("/auth/register", data)},
    }
}

export default APITMethods;