import {
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import TAGS from "../../lib/constants/TAGS";
import { useState } from "react";
import useRegisterStore from "./hooks/useRegisterStore";
import APIMethods from "../../lib/axios/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Suggestion() {
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const handleAddTag = (tagInput: string) => {
    setTags([...tags, tagInput]);
    setFavouriteTopics([...tags, tagInput]);
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const [setFavouriteTopics] = useRegisterStore((state) => [
    state.setFavouriteTopics,
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const registerNotify = () =>
    toast.success("Successfully created your profile!");
  const [user, profile] = useRegisterStore((state) => [
    state.user,
    state.profile,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const userCreation = async () => {
    try {
      const data = {
        email: user!.email,
        password: user!.password,
        profile: profile,
        tags: tags,
      };
      await APIMethods.auth.register(data).then((res) => {
        console.log("res", res.status);
        setIsLoading(false);
      });
      registerNotify();

      navigate("/", { replace: true });
    } catch (error) {
      console.log("error while registering", error);
    }
  };

  return (
    <Stack maxWidth={"50vw"} gap={5}>
      <Stack className="topics" direction={"row"} flexWrap={"wrap"} gap={2}>
        {TAGS.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => handleAddTag(tag)}
            sx={{
              background: "#474747",
              color: "white",
              borderRadius: "14px",
              padding: "5px 10px",
              "&:hover": {
                background: "#333333",
              },
            }}
          />
        ))}
      </Stack>

      <Stack>
        <Typography variant={"h6"}>Selected Topics</Typography>
        <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
              sx={{
                background: "#474747",
                color: "white",
                borderRadius: "14px",
                padding: "5px 10px",
                "& .MuiChip-deleteIcon": {
                  color: "white", // Change this to the desired color for the delete icon
                  "&:hover": {
                    color: "#fff",
                  },
                },
              }}
            />
          ))}
        </Stack>

        <Stack
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          paddingTop={8}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setIsLoading(true);
              userCreation()
                .then(() => {
                  console.log("user created");
                })
                .catch((error) => {
                  console.log("error while creating user", error);
                });
            }}
            sx={{ height: "65px", borderRadius: "100%", scale: "0.8" }}
          >
            {isLoading ? <CircularProgress size={25} /> : <ArrowForwardIcon />}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
