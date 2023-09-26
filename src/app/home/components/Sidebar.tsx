import { Avatar, Chip, Stack, Typography } from "@mui/material";
import Footer from "../../../layout/Footer";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import useSearchStore from "../../../lib/store/useSearchStore";

export default function Sidebar() {
  const [userTags, setUserTags] = useState<string[]>([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string) as {
      tags: string[];
    };
    setUserTags(user.tags);
  }, []);

  const [setSearch] = useSearchStore(
    (state: { setSearch: (search: string) => void }) => [state.setSearch],
  );

  const navigate = useNavigate();
  const tagClicked = (tag: string) => {
    setSearch(tag);
    navigate(`/search/${tag}`);
  };

  return (
    <Stack height={"100vh"}>
      <Stack>
        <Typography color={"secondary"}>✨Top picks for you</Typography>

        <Stack
          className="sidebar-items"
          direction={"column"}
          gap={1}
          sx={{ borderRadius: "5px", padding: "5px" }}
          paddingTop={3}
          marginY={1}
        >
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Avatar
              sx={{ width: 24, height: 24 }}
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
            />
            <Typography variant={"caption"}>
              Naomi Sen · 12 July , 2023
            </Typography>
          </Stack>
          <Typography fontWeight={600} variant={"body1"}>
            Tech hikes are rampaging.
          </Typography>
        </Stack>
        <Stack
          className="sidebar-items"
          direction={"column"}
          gap={1}
          sx={{ borderRadius: "5px", padding: "5px" }}
          marginY={1}
        >
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Avatar
              sx={{ width: 24, height: 24 }}
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
            />
            <Typography variant={"caption"}>
              Shirja Chatterjee · 27 June , 2023
            </Typography>
          </Stack>
          <Typography fontWeight={600} variant={"body1"}>
            LGBTQ community is still fighting for their rights.
          </Typography>
        </Stack>
      </Stack>

      {userTags && (
        <Stack marginTop={5}>
          <Typography>🏷️ Recommended topics</Typography>

          <Stack
            direction={"row"}
            gap={1}
            paddingY={2}
            flexWrap={"wrap"}
            maxWidth={"300px"}
          >
            {userTags.map((tag, index) => (
              <Chip
                sx={{
                  color: "#fff",
                  background: "#474747",
                  fontWeight: 400,
                  "&:hover": {
                    background: "#474747",
                  },
                }}
                key={index}
                label={tag}
                onClick={() => tagClicked(tag)}
              />
            ))}
          </Stack>
        </Stack>
      )}
      <Stack direction={"column"} flexGrow={1}></Stack>

      <Stack
        position={"sticky"}
        bottom={0}
        paddingY={1}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Footer />
      </Stack>
    </Stack>
  );
}
