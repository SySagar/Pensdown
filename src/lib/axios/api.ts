
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
        verifyToken: async (token : any) => {return await APIInstance.post("/verify",token)},
    },

    blog:{
        getBlogs: async () => {return await APIInstance.get("/blog/getAll")},
        getSingleBlog: async (blogId: any) => {return await APIInstance.post(`/blog/getBlog`,blogId)},
        createBlog: async (data: any) => {console.log(data);return await AuthorizedAPIInstance.post("/blog/create", data)},
        updateBlog: async (id: string, data: any) => {return await AuthorizedAPIInstance.put(`/blog/${id}`, data)},
        deleteBlog: async (id: string) => {return await AuthorizedAPIInstance.delete(`/blog/${id}`)},
        getUserBlogs: async (email:any) => {return await APIInstance.post("/blog/getUserBlogs",email)},
        getUserBlogsByUserId: async (authorId:any) => {return await APIInstance.post("/blog/getUserBlogsByUserId",authorId)},
        getBlogsByTag: async (tag:string) => {return await APIInstance.post("/blog/getBlogsByTag",{tag})},
        likeBlog: async (data: {userId:string,blogId:string}) => {return await AuthorizedAPIInstance.post(`/blog/${data.blogId}`, data)},
        commentOnBlog: async (data: {userId:string,blogId:string,comment:string}) => {await AuthorizedAPIInstance.post(`/blog/comment/${data.blogId}`, data)},
        getComments: async (data: {blogId:string}) => {return await APIInstance.get(`/blog/comments/${data.blogId}`)},
        addComment: async (data: {blogId:string,comment:string,authorId:string}) => {return await AuthorizedAPIInstance.post(`/blog/comment/${data.blogId}`, data)},
        },
    user:{
      addNotification: async (data: {userId:string,message:string}) => {return await AuthorizedAPIInstance.post(`/notifications/send`, data)},
      getNotifications: async (data: {userId:string}) => {return await AuthorizedAPIInstance.post(`/notifications/get`,data)},
      isFollowingUser: async (data:{userId:string,id:{id:string}})=>{return await AuthorizedAPIInstance.post(`/user/follow/${data.userId}`,data.id)},
      getAuthorInfo: async (data:{authorId:string})=>{return await APIInstance.get(`/user/${data.authorId}`)},
    }

}

export default APIMethods;