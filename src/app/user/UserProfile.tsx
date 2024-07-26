import { Button, IconButton, Link, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import APIMethods from "../../lib/axios/api";
import { userProfileTypes, userTypes } from "./types/userTypes";
import useLoadingStore from "../../lib/store/useLoading";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-hot-toast";

export default function UserProfile({
  isOpen,
  onClose,
  authorId,
}: userProfileTypes) {
  const [profile, setProfile] = useState<userTypes>({} as userTypes);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [isLoading, setIsLoading] = useLoadingStore(
    (state: { isLoading: boolean; setIsLoading: (arg0: boolean) => void }) => [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      state.isLoading,
      state.setIsLoading,
    ],
  );
  const fetchProfile = async () => {
    setIsLoading(true);
    await APIMethods.user
      .getAuthorInfo({ authorId })
      .then((res: { data: userTypes }) => {
        console.log(res);
        setProfile(res.data);
      })
      .finally(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setIsLoading(false);
      });
  };

  const [isFollowing, setIsFollowing] = useState(false);
  const follow = async () => {
    const data = {
      userId: authorId,
      id: {
        id: JSON.parse(localStorage.getItem("user") as string)._id,
      },
    };

    const followRes = await APIMethods.user.isFollowingUser(data);
    console.log(followRes);
    if (followRes.data.followStatus == "unfollowing") {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    window.location.reload();
    toast.error("You have been logged ");
  };

  useEffect(() => {
    fetchProfile()
      .then(() => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isOpen]);

  const navigate = useNavigate();
  const navigateToProfile = () => {
    //console.log(profile);
    navigate(`/user/${profile.displayName}`, { state: { authorId } });
  };

  return (
    <motion.div
      className="sidebar"
      initial={{ x: "-100%" }}
      style={{
        position: "fixed",
        top: 0,
        right: -500,
        zIndex: 10,
      }}
      animate={isOpen ? { x: -500 } : { x: "100%" }}
      transition={{ type: "tween" }}
    >
      <Stack
        position={"fixed"}
        top={0}
        right={0}
        bottom={0}
        minWidth={"26rem"}
        minHeight={"100vh"}
        sx={{
          background: "#fff",
          borderRadius: "8px 0px 0px 8px",
          borderColor: "secondary.main",
        }}
      >
        <Stack height={"100%"} position={"relative"}>
          <Stack
            position={"absolute"}
            top={10}
            left={10}
            flexDirection={"row"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <IconButton
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              onClick={onClose}
            >
              <ArrowBackIcon />
            </IconButton>

            <Button
              onClick={handleLogout}
              variant="text"
              sx={{
                marginRight: "2rem",
                display: "flex",
                gap: "4px",
                "&:hover": {
                  opacity: 0.8,
                  color: "#FF0051",
                },
              }}
            >
              <LogoutIcon />
              Logout
            </Button>
          </Stack>

          {isLoading ? (
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              height={"100%"}
            >
              <CircularProgress />
            </Stack>
          ) : (
            <Stack
              margin={4}
              marginTop={8}
              border={2}
              borderColor={"#BDBDBD"}
              height={"100%"}
              borderRadius={5}
              position={"relative"}
            >
              <img
                src="https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                alt=""
                width={"100%"}
                style={{
                  objectFit: "cover",
                  borderRadius: 18,
                }}
              />

              <Stack
                position={"absolute"}
                bottom={0}
                gap={4}
                borderRadius={5}
                minHeight={"70%"}
                width={"100%"}
                sx={{ background: "white" }}
                alignItems={"center"}
              >
                <Stack
                  marginTop={-6}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <img
                    src={
                      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                    }
                    alt=""
                    width={"100px"}
                    height={"100px"}
                    style={{
                      objectFit: "cover",
                      borderRadius: "100%",
                    }}
                  />
                </Stack>

                <Stack alignItems={"center"}>
                  <Typography
                    component={Link}
                    onClick={navigateToProfile}
                    underline="hover"
                    sx={{
                      cursor: "pointer",
                    }}
                    fontWeight={500}
                    variant="h5"
                  >
                    {profile.name}
                  </Typography>

                  <Typography fontWeight={600} variant={"body2"}>
                    @{profile.displayName}
                  </Typography>
                </Stack>

                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  paddingX={4}
                  color={"text.secondary"}
                >
                  <Typography variant={"body2"}>{profile.bio}</Typography>
                </Stack>

                <Stack direction={"row"} gap={3} marginTop={3}>
                  <Stack direction={"column"} alignItems={"center"}>
                    <Typography variant={"body1"} color={"text.secondary"}>
                      Blogs
                    </Typography>
                    <Typography fontWeight={600}>
                      {profile.blogsCount}
                    </Typography>
                  </Stack>

                  <Stack direction={"column"} alignItems={"center"}>
                    <Typography variant={"body1"} color={"text.secondary"}>
                      Followers
                    </Typography>
                    <Typography fontWeight={600}>
                      {profile.followersCount}
                    </Typography>
                  </Stack>

                  <Stack direction={"column"} alignItems={"center"}>
                    <Typography variant={"body1"} color={"text.secondary"}>
                      Respect
                    </Typography>
                    <Typography fontWeight={600}>{profile.respect}</Typography>
                  </Stack>
                </Stack>

                <Stack width={"140px"} mt={4}>
                  <Button
                    fullWidth
                    onClick={() => {
                      follow()
                        .then(() => {
                          console.log("done");
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                    sx={{
                      backgroundColor: "secondary.main",
                      "&:hover": {
                        backgroundColor: "secondary.main",
                      },
                    }}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </motion.div>
  );
}
