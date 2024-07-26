import { Skeleton, Divider, Stack, Typography } from "@mui/material";
import HeroBlog from "./components/HeroBlog";
import Blog from "./components/Blog";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import APIMethods from "../../lib/axios/api";
import { blogTypes } from "../blog/types/blogTypes";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import useSearchStore from "../../lib/store/useSearchStore";
import "./home.css";
import { useResponsive } from "../../hooks/useResponsive";
import AnimatePage from "../../layout/AnimatePage";

export default function HeroPage() {
  const [loading, setLoading] = useState(true);
  const { isTablet, isMobile } = useResponsive();
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
      sx={{
        backgroundColor: "background.main",
      }}
    >
      <AnimatePage>
        <Stack
          className="hero-content"
          marginTop={3}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
          borderColor={"#A3A0B2"}
        >
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            color={"text.secondary"}
          >
            <Typography variant={isMobile ? "h5" : isTablet ? "h4" : "h3"}>
              The best from the week
            </Typography>
            <Typography
              paddingTop={isMobile ? 1 : 0}
              textAlign={"center"}
              color={"text.secondary"}
              fontSize={isMobile ? "0.7rem" : "1.15rem"}
              fontWeight={600}
            >
              The latest industry news, interviews, technologies, and resources.
            </Typography>
          </Stack>

          <Stack
            position={"relative"}
            marginTop={isTablet ? 2 : 6}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <HeroBlog />
          </Stack>

          {loading ? (
            <Stack
              flexWrap={"wrap"}
              paddingTop={isTablet ? "40px" : "60px"}
              width={"75%"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              padding={2}
              gap={2}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={"250px"}
                  height={isMobile ? "200px" : "250px"}
                />
              ))}
            </Stack>
          ) : (
            <Stack
              className="daily-blogs"
              padding={2}
              paddingTop={isTablet ? "40px" : "60px"}
              maxWidth={isTablet ? "90%" : "80vw"}
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
      </AnimatePage>
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
