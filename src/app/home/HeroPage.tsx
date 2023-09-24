import { CircularProgress, Divider, Stack, Typography } from "@mui/material";
import HeroBlog from "./components/HeroBlog";
import Blog from "./components/Blog";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import APIMethods from "../../lib/axios/api";
import { blogTypes } from "../blog/types/blogTypes";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import useSearchStore from "../../lib/store/useSearchStore";
import SearchedBlogs from "./components/SearchedBlogs";

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

export default function HeroPage() {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const [searchItem] = useSearchStore((state: { searchItem: string }) => [
    state.searchItem,
  ]);

  const [blogs, setBlogs] = useState([] as unknown as blogTypes[]);
  const fetchBLogs = async () => {
    await APIMethods.blog.getBlogs().then((res: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const blogs = res.data.blogs as blogTypes[];
      setBlogs(blogs);
    });
  };

  useEffect(() => {
    fetchBLogs()
      .then(() => {
        console.log("fetching done");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("finally", blogs);
        setLoading(false);
      });
  }, []);
  return (
    <Stack
      className="main"
      minHeight={"100vh"}
      direction={"row"}
      justifyContent={searchItem.length == 0 ? "space-evenly" : "space-between"}
      position={"relative"}
      alignItems={"flex-start"}
    >
      <Stack
        marginTop={3}
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
        borderColor={"#A3A0B2"}
        width={searchItem.length == 0 ? "80vw" : "100%"}
      >
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h2">The best from the week</Typography>
          <Typography fontSize={"16px"} fontWeight={600}>
            The latest industry news, interviews, technologies, and resources.
          </Typography>
        </Stack>

        <Stack position={"relative"} marginTop={6}>
          <HeroBlog />
        </Stack>

        {/* {
          loading ? 
          <Stack width={'100%'} justifyContent={'center'} alignItems={'center'} height={'20vh'}>
            <CircularProgress color="secondary" />
          </Stack>
           :
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
          {blogs.length!=0 && blogs.map((blog, index) => (
            <Blog
              key={index}
              blogId={blog._id}
              author={blog.authorName}
              date={blog.date}
              title={blog.title}
              tags={blog.tags}
              image={blog.coverImageURL}
              likes={blog.likes}
            />
          ))}
          {
            (blogs.length==0) && 
            <Stack direction={'row'} gap={2} paddingY={5} alignItems={'center'}>
            <Typography variant="h4">No Blogs to show</Typography>
              <SentimentDissatisfiedIcon sx={{fontSize:'3rem',color:'#474747'}} />
            </Stack>
          }
        </Stack>
        } */}

        {loading ? (
          <Stack
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"20vh"}
          >
            <CircularProgress color="secondary" />
          </Stack>
        ) : (
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
            {blogs.length != 0 &&
              blogs.map((blog, index) => (
                <Blog
                  key={index}
                  blogId={blog._id}
                  author={blog.authorName}
                  date={blog.date}
                  title={blog.title}
                  tags={blog.tags}
                  image={blog.coverImageURL}
                  likes={blog.likes}
                />
              ))}
            {blogs.length == 0 && (
              <Stack
                direction={"row"}
                gap={2}
                paddingY={5}
                alignItems={"center"}
              >
                <Typography variant="h4">No Blogs to show</Typography>
                <SentimentDissatisfiedIcon
                  sx={{ fontSize: "3rem", color: "#474747" }}
                />
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
      <Stack direction={"row"} gap={2} position={"sticky"} right={0} top={0}>
        <Divider
          sx={{ marginTop: "25px", width: "1px", background: "#d6d5dd" }}
          orientation="vertical"
          flexItem
        ></Divider>
        <Stack
          className="right-sidebar"
          padding={3}
          justifyContent={"center"}
          alignItems={"center"}
          width={"310px"}
        >
          <Sidebar />
        </Stack>
      </Stack>
    </Stack>
  );
}
