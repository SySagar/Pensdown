
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
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken") as string}`;
    return config;
  });

const APIMethods = {

    auth:{
        login: async (data: LoginTypes) => {return await APIInstance.post("/auth/login", data)},
        register: async (data: RegisterTypes) => {return await APIInstance.post("/auth/register", data)},
    },

    verify:{
        verifyToken: async (token : string) => {return await APIInstance.post("/verify",token)},
    },

    blog:{
        getBlogs: async () => {return await APIInstance.get("/blog/getAll")},
        getSingleBlog: async (id: string) => {return await AuthorizedAPIInstance.get(`/blog/${id}`)},
        createBlog: async (data: any) => {console.log(data);return await AuthorizedAPIInstance.post("/blog/create", data)},
        updateBlog: async (id: string, data: any) => {return await AuthorizedAPIInstance.put(`/blog/${id}`, data)},
        deleteBlog: async (id: string) => {return await AuthorizedAPIInstance.delete(`/blog/${id}`)},
        getUserBlogs: async (email:any) => {return await APIInstance.post("/blog/getUserBlogs",email)},
    }

}

export default APIMethods;