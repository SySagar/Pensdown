import { CircularProgress, Stack, Typography } from "@mui/material";
import HeroBlog from "./components/HeroBlog";
import Blog from "./components/Blog";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import APIMethods from '../../lib/axios/api'

// const blogs = [
//   {
//     id: 1,
//     author: "Naomi Sen",
//     date: "1 Oct 2021",
//     title: "Migration to India",
//     tags: ["Migration", "India"],
//     image:
//       "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
//     likes: "47",
//   },
//   {
//     id: 2,
//     author: "Naomi Sen",
//     date: "5 Nov 2021",
//     title: "Food Crysis",
//     tags: ["Migration", "India", "Food", "Crysis"],
//     image:
//       "https://images.unsplash.com/photo-1447078806655-40579c2520d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
//     likes: "203",
//   },
//   {
//     id: 3,
//     author: "Samuel",
//     date: "28 July 2021",
//     title: "Migration to India",
//     tags: ["Migration", "India", "Slavery"],
//     image:
//       "https://images.unsplash.com/photo-1447078806655-40579c2520d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
//     likes: "61",
//   },
//   {
//     id: 4,
//     author: "Samuel",
//     date: "28 July 2021",
//     title: "Migration to India",
//     tags: ["Migration", "India"],
//     image:
//       "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80",
//     likes: "102",
//   },
//   {
//     id: 5,
//     author: "Samuel",
//     date: "28 July 2021",
//     title: "Migration to India",
//     tags: ["Migration", "India", "People"],
//     image:
//       "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
//     likes: "47",
//   },
//   {
//     id: 6,
//     author: "Samuel",
//     date: "28 July 2021",
//     title: "Migration to India",
//     tags: ["Migration", "India"],
//     image:
//       "https://images.unsplash.com/photo-1447078806655-40579c2520d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
//     likes: "21",
//   },
// ];

interface blogTypes {
  _id: any;
  title: string;
  date: string;
  content: string;
  authorName: string;
  likes: string;
  tags: string[];
  coverImageURL: string;
}

export default function HeroPage() {
  const [loading,setLoading] = useState(true);

  const [blogs,setBlogs] = useState([] as unknown as blogTypes[]);
  const fetchBLogs = async () => {
    await APIMethods.blog.getBlogs().then((res:any) => {

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const blogs = res.data.blogs as blogTypes[];
      setBlogs(blogs);
    });

  }

  useEffect(() => {

    fetchBLogs().then(() => {
      console.log("fetching done");
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      console.log("finally",blogs);
      setLoading(false);
    });
  
  }, []);
  return (
    <Stack
      className="main"
      minHeight={"100vh"}
      direction={"row"}
      justifyContent={"space-evenly"}
      position={"relative"}
      alignItems={"flex-start"}
    >
  
      <Stack
        marginTop={3}
        justifyContent={"center"}
        alignItems={"center"}
        borderRight={2}
        gap={1}
        paddingX={4}
        borderColor={"#A3A0B2"}
      >
        <Typography variant="h2">The best from the week</Typography>
        <Typography fontSize={'16px'} fontWeight={600}>The latest industry news, interviews, technologies, and resources.</Typography>

        <Stack position={"relative"} marginTop={6}>
          <HeroBlog />
        </Stack>

        {
          loading ?<CircularProgress /> :
        <Stack
          className="daily-blogs"
          padding={2}
          maxWidth={"80vw"}
          gap={4}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={"center"}
          direction={"row"}
        >
          {blogs.map((blog, index) => (
            <Blog
              key={index}
              author={blog.authorName}
              date={blog.date}
              title={blog.title}
              tags={blog.tags}
              image={blog.coverImageURL}
              likes={blog.likes}
            />
          ))}
        </Stack>
        }
      </Stack>
          <Stack
              className="right-sidebar"
              position={"sticky"}
              right={0}
              top={0}
              padding={3}
              minWidth={"300px"}>
            <Sidebar />
          </Stack>
    </Stack>
  );
}
