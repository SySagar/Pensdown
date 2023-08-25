import { Stack, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";

interface BlogTypes {
    author: string;
    date: string;
    title: string;
    tags: string[];
    blogId: string; 
    image: string;
    likes: number;
}

export default function Blog({author, date, title, tags=["india","hello world"], blogId, image}: BlogTypes) {
  const navigate = useNavigate();

  const redirectToBlog = () => {
    console.log("redirecting to blog");
    navigate(`/${blogId}`);
  };
  return (
    <Stack
      className="blog"
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
      onClick={redirectToBlog}
      sx={{

          background:"#474554",
            borderRadius:"5px",
      }}
    >
      <Stack overflow={'hidden'} 
      sx={{
        maxWidth: "300px",
        maxHeight: "200px",
      }}>

      <img
        style={{
          objectFit: "cover",
          borderRadius: "4px",
        }}
        src={image}
        alt=""
        />
        </Stack>
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
