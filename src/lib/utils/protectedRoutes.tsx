import { Navigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react';
import APIMethods from "../axios/api";
import { useNavigate } from 'react-router-dom';

const PrivateRoutes = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const token = localStorage.getItem('accessToken') as string;
    console.log("token", token);
    const navigate = useNavigate();

    const updateLocalUser = async () => {
      const localUser = JSON.parse(localStorage.getItem("user") as string) as unknown as {email:string,blogs:[]};
      if (localUser == null) return;
      try {
  
        const blogsCollection = await APIMethods.blog.getUserBlogs({email:localUser.email});
        // console.log("blogsCollection", blogsCollection);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log("blogsCollection.data.blogs", blogsCollection.data.blogs);
        console.log("localUser", localUser.blogs);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        localUser.blogs = blogsCollection.data.blogs;
  
      }
      catch(e) {
        console.log("error", e);
        localStorage.removeItem("accessToken");
        navigate("/auth/login");
      }
  
    };
  
    useEffect(() => {
  
      updateLocalUser()
        .then(() => {
          console.log("user updated")})
        .catch((e) => {
          console.log("user not updated");
          console.log("error", e);
        });
    }, []);

  return (token!=null || token!=undefined) ? <Outlet/> : <Navigate to="/auth/login" />
}

export default PrivateRoutes;