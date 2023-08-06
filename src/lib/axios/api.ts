
import axios, { AxiosInstance } from "axios";
import {LoginTypes,RegisterTypes} from "./types";

const APIInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.BASE_API as string,
  });
  
  const AuthorizedAPIInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.BASE_API as string,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  AuthorizedAPIInstance.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token") as string}`;
    return config;
  });

const APITMethods = {

    auth:{
        login: (data: LoginTypes) => AuthorizedAPIInstance.post("/auth/login", data),
        register: (data: RegisterTypes) => AuthorizedAPIInstance.post("/auth/register", data),
    }
}

export default APITMethods;