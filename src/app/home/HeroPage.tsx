import { Avatar, Chip, Fab, Stack, Typography } from "@mui/material";
import HeroBlog from "./components/heroBlog";
import CreateIcon from "@mui/icons-material/Create";
import Blog from "./components/Blog";

const tags = [
  "technology",
  "politics",
  "lifestyle",
  "food",
  "travel",
  "fashion",
  "sports",
  "music",
];

const blogs = [
  {
    id: 1,
    author: "Naomi Sen",
    date: "1 Oct 2021",
    title: "Migration to India",
    tags: ["Migration", "India"],
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    likes: "47",
  },
  {
    id: 2,
    author: "Naomi Sen",
    date: "5 Nov 2021",
    title: "Food Crysis",
    tags: ["Migration", "India", "Food", "Crysis"],
    image:
      "https://images.unsplash.com/photo-1447078806655-40579c2520d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    likes: "203",
  },
  {
    id: 3,
    author: "Samuel",
    date: "28 July 2021",
    title: "Migration to India",
    tags: ["Migration", "India", "Slavery"],
    image:
      "https://images.unsplash.com/photo-1447078806655-40579c2520d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    likes: "61",
  },
  {
    id: 4,
    author: "Samuel",
    date: "28 July 2021",
    title: "Migration to India",
    tags: ["Migration", "India"],
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80",
    likes: "102",
  },
  {
    id: 5,
    author: "Samuel",
    date: "28 July 2021",
    title: "Migration to India",
    tags: ["Migration", "India", "People"],
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    likes: "47",
  },
  {
    id: 6,
    author: "Samuel",
    date: "28 July 2021",
    title: "Migration to India",
    tags: ["Migration", "India"],
    image:
      "https://images.unsplash.com/photo-1447078806655-40579c2520d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    likes: "21",
  },
];

export default function HeroPage() {
  return (
    <Stack
      className="main"
      minHeight={"100vh"}
      direction={"row"}
      justifyContent={"center"}
      position={"relative"}
      alignItems={"flex-start"}
    >
      <Stack
        className="write"
        position={"fixed"}
        right={"3rem"}
        bottom={"3rem"}
      >
        <Fab color="default" aria-label="create">
          <CreateIcon />
        </Fab>
      </Stack>
      <Stack
        marginTop={3}
        justifyContent={"center"}
        alignItems={"center"}
        gap={8}
        borderRight={2}
        borderColor={"#A3A0B2"}
      >
        <Typography variant="h2">The best from the week</Typography>

        <Stack position={"relative"}>
          <HeroBlog />
        </Stack>

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
              author={blog.author}
              date={blog.date}
              title={blog.title}
              tags={blog.tags}
              image={blog.image}
              likes={blog.likes}
            />
          ))}
        </Stack>
      </Stack>
      <Stack
        className="right-sidebar"
        position={"sticky"}
        right={0}
        top={0}
        padding={3}
        minWidth={"300px"}
      >
        <Stack>
          <Typography color={"secondary"}>✨Top picks for you</Typography>

          <Stack className="sidebar-items" direction={"column"} gap={1} sx={{ borderRadius:'5px', padding:'5px'}} paddingTop={3} marginY={1}>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <Avatar
                sx={{ width: 24, height: 24 }}
                alt="Remy Sharp"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
              />
              <Typography variant={"caption"}>Naomi Sen · 12 July , 2023</Typography>
            </Stack>
            <Typography fontWeight={600} variant={"body1"}>
              Tech hikes are rampaging.
            </Typography>
          </Stack>
          <Stack className="sidebar-items" direction={"column"} gap={1} sx={{ borderRadius:'5px', padding:'5px'}} marginY={1}>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <Avatar
                sx={{ width: 24, height: 24 }}
                alt="Remy Sharp"
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
              />
              <Typography variant={"caption"}>Shirja Chatterjee · 27 June , 2023</Typography>
            </Stack>
            <Typography fontWeight={600} variant={"body1"}>
              LGBTQ community is still fighting for their rights.
            </Typography>
          </Stack>
        </Stack>

        <Stack marginTop={5}>
          <Typography>
          🏷️ Recommended topics
          </Typography>

          <Stack direction={'row'} gap={1} paddingY={2} flexWrap={'wrap'} maxWidth={'300px'}>
            
            {tags.map((tag, index) => (
              <Chip
                sx={{
                  color: "#fff",
                  background: "#474747",
                  fontWeight: 400,
                }}
                key={index}
                label={tag}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
