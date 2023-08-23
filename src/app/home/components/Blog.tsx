import { Stack, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";

interface BlogTypes {
    author: string;
    date: string;
    title: string;
    tags: string[]; 
    image: string;
    likes: string;
}

export default function Blog({author, date, title, tags=["india","hello world"], image, likes}: BlogTypes) {
  likes = "10";
  console.log("likes", likes);
  return (
    <Stack
      className="blog"
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
      sx={{

          background:"#474554",
            borderRadius:"5px",
      }}
    >
      <img
        style={{
          objectFit: "cover",
          maxWidth: "300px",
          borderRadius: "4px",
        }}
        src={image}
        alt=""
      />

      <Stack
        className="about"
        direction={"column"}
        width={"80%"}
        justifyContent={'flex-start'}
        alignItems={'flex-start'}
        padding={3} 
      >
        <Typography variant="caption" fontWeight={600} color={"#fff"}>
          {author} · {date}
        </Typography>
        <Typography variant="h6" fontWeight={550} color={"#fff"}>
          {title}
        </Typography>
        <Stack
          className="tags"
          direction={"row"}
          marginY={1}
          flexWrap={'wrap'}
          gap={1}
        >
          {tags.map((tag, index) => (
            <Chip
              sx={{
                height: "15px",
                color: "#fff",
                fontWeight: 400,
                fontSize: '0.7rem',
              }}
              key={index}
              label={tag}
              variant="outlined"
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
