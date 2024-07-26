import { Divider, Stack, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useResponsive } from "../../../hooks/useResponsive";
import { useNavigate } from "react-router-dom";
import "../home.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import ImageWithLoading from "../../blog/components/ImageWitLoading";

interface BlogTypes {
  author: string;
  date: string;
  title: string;
  tags: string[];
  blogId: string;
  image: string;
  likes: number;
}

export default function Blog({
  author,
  date,
  title,
  tags = ["india", "hello world"],
  blogId,
  image,
}: BlogTypes) {
  const navigate = useNavigate();
  const isPhone = useMediaQuery("(max-width:800px)");
  const { isTablet } = useResponsive();

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
      maxWidth={"300px"}
      maxHeight={isTablet ? "80px" : "300px"}
      onClick={redirectToBlog}
      color={"primary.main"}
      sx={{
        backgroundColor: "#FBFCFA",
        boxShadow: "3px 3px 10px rgba(214, 208, 174,0.7)",
        borderRadius: "5px",
      }}
    >
      <Stack overflow={"hidden"} className="laptop-image">
        {/* <img
          style={{
            objectFit: "cover",
            width: "300px",
            height: "200px",
            borderRadius: "4px",
          }}
          src={image}
          alt=""
        /> */}
        <ImageWithLoading
          width={"300px"}
          height={"200px"}
          style={{
            objectFit: "cover",
            width: "300px",
            height: "200px",
            borderRadius: "4px",
          }}
          src={image}
          alt={title}
        />
      </Stack>
      <Stack
        className="mobile-image"
        sx={{
          objectFit: "cover",
        }}
      >
        <img
          style={{
            objectFit: "cover",
            width: isTablet ? "90px" : "140px",
            height: isTablet ? "90px" : "140px",
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
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        padding={3}
      >
        <Typography
          variant="caption"
          fontWeight={600}
          color={isPhone ? "text.secondary" : "primary.main"}
        >
          {author} · {date}
        </Typography>
        <Typography
          variant="h6"
          fontWeight={550}
          color={isPhone ? "#000" : "text.primary"}
        >
          {title}
        </Typography>
        <Stack
          className="tags"
          direction={"row"}
          marginY={1}
          flexWrap={"wrap"}
          paddingTop={1}
          gap={1}
        >
          {tags.map((tag, index) => (
            <Chip
              sx={{
                height: "15px",
                color: "text.secondary",
                fontWeight: 500,
                fontSize: "0.7rem",
                backgroundColor: "secondary.light",
              }}
              key={index}
              label={tag}
              variant="outlined"
            />
          ))}
        </Stack>
      </Stack>

      <Divider
        className="mobile-divider"
        sx={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          background: "grey",
        }}
      />
    </Stack>
  );
}
