
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
        login: async (data: LoginTypes) => {return await APIInstance.post("/auth/login", data)},
        register: async (data: RegisterTypes) => {return await APIInstance.post("/auth/register", data)},
    },

    verify:{
        verifyToken: async (token : string) => {return await APIInstance.post("/verify",token)},
    },

    blog:{
        getBlogs: async () => {return await AuthorizedAPIInstance.get("/blog")},
        getBlog: async (id: string) => {return await AuthorizedAPIInstance.get(`/blog/${id}`)},
        createBlog: async (data: any) => {return await AuthorizedAPIInstance.post("/blog/create", data)},
        updateBlog: async (id: string, data: any) => {return await AuthorizedAPIInstance.put(`/blog/${id}`, data)},
        deleteBlog: async (id: string) => {return await AuthorizedAPIInstance.delete(`/blog/${id}`)},
    }

}

export default APITMethods;