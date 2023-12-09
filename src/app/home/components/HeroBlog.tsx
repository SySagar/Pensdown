import { Stack, Typography } from "@mui/material";
import moment from "moment";
import Chip from "@mui/material/Chip";
import "../home.css";

const associatedTags = ["women", "workplace", "hostility", "work"];

export default function HeroBlog() {
  return (
    <Stack
      className="hero-blog"
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
    >
      <img
        className="hero-blog-image"
        style={{
          objectFit: "cover",
          minHeight: "100px",
          minWidth: "600px",
          borderRadius: "8px",
        }}
        src="https://images.unsplash.com/photo-1520960858461-ac671067213e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=897&q=80"
        alt=""
      />

      <Stack
        className="about"
        direction={"column"}
        position={"absolute"}
        padding={3}
        bottom={0}
        left={0}
      >
        <Typography variant="body2" fontWeight={600} color={"#fff"}>
          Oyleve Rhye · {moment().format(" MMMM Do ")}
        </Typography>
        <Typography variant="h4" fontWeight={550} color={"#fff"}>
          Women hostility in the workplace
        </Typography>
        <Stack
          className="tags"
          direction={"row"}
          marginY={1}
          maxWidth={"100px"}
          gap={1}
        >
          {associatedTags.map((tag, index) => (
            <Chip
              sx={{
                height: "20px",
                color: "#fff",
                fontWeight: 4000,
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
