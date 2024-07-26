import { IconButton, Stack, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AnimatePage from "../../layout/AnimatePage";

export default function About() {
  return (
    <AnimatePage>
      <Stack
        paddingY={8}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          backgroundColor: "background.main",
        }}
      >
        <Stack
          width={"70%"}
          padding={2}
          direction={"row"}
          alignItems={"center"}
          gap={5}
        >
          <Stack className="image">
            <img src="/png/about.png" width={600} alt="" />
          </Stack>

          <Stack
            flexGrow={1}
            gap={8}
            justifyContent={"center"}
            alignItems={"start"}
          >
            <Typography variant="h3" color={"primary.main"}>
              Know About Us
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Pensdown is a platform for writers to share their thoughts and
              ideas with the world. It is a place where you can write about
              anything you want and share it with the world.
            </Typography>

            <Stack
              className="socials"
              direction={"row"}
              gap={4}
              justifyContent={"center"}
              width={"100%"}
            >
              <IconButton>
                <InstagramIcon
                  sx={{
                    fontSize: "38px",
                    "&:hover": {
                      color: "#ff471a",
                    },
                  }}
                />
              </IconButton>
              <IconButton>
                <TwitterIcon
                  sx={{
                    fontSize: "38px",
                    "&:hover": {
                      color: "#1DA1F2",
                    },
                  }}
                />
              </IconButton>
              <IconButton>
                <LinkedInIcon
                  sx={{
                    fontSize: "38px",
                    "&:hover": {
                      color: "#0e76a8",
                    },
                  }}
                />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </AnimatePage>
  );
}
