import { Button, Divider, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
import "./user.css";
import { useEffect } from "react";
import { useState } from "react";
import { userTypes, userBlogTypes } from "./types/userTypes";
import useLoadingStore from "../../lib/store/useLoading";
import CircularProgress from "@mui/material/CircularProgress";
import APIMethods from "../../lib/axios/api";
import { useLocation } from "react-router-dom";

interface LocationState {
  authorId: string;
}

export default function AboutUser() {
  const { state } = useLocation() as unknown as { state: LocationState };
  const [profile, setProfile] = useState<userTypes>({} as userTypes);
  const [blogs, setBlogs] = useState<userBlogTypes[]>([]);
  const { isLoading, setIsLoading } = useLoadingStore();
  const fetchProfile = async () => {
    const { authorId } = state;
    setIsLoading(true);
    await APIMethods.user
      .getAuthorInfo({ authorId })
      .then((res: { data: userTypes }) => {
        // console.log(res);
        setProfile(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [isFollowing, setIsFollowing] = useState(false);
  const follow = async () => {
    const data = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      userId: JSON.parse(localStorage.getItem("user") as string)._id,
      id: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        id: JSON.parse(localStorage.getItem("user") as string)._id,
      },
    };
    const followRes = await APIMethods.user.isFollowingUser(data);
    console.log(followRes);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (followRes.data.followStatus == "unfollowing") {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
  };

  const fetchBlog = async () => {
    const { authorId } = state;
    await APIMethods.blog
      .getUserBlogsByUserId({ authorId })
      .then((res: { data: { blogs: any } }) => {
        console.log(res.data.blogs);
        setBlogs(res.data.blogs as userBlogTypes[]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchProfile()
      .then(() => {
        console.log("fetched profile");
      })
      .catch((err) => {
        console.log(err);
      });

    fetchBlog()
      .then(() => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!profile && !blogs) return;
    else setIsLoading(false);
  }, [profile, blogs]);

  return (
    <Stack
      minHeight={"130vh"}
      justifyContent={"start"}
      alignItems={"end"}
      gap={5}
    >
      <Stack
        className="user-card-profile"
        paddingBottom={5}
        justifyContent={"start"}
        alignItems={"center"}
        maxWidth={"360px"}
        direction={"column"}
        zIndex={3}
        gap={3}
        position={"absolute"}
        top={30}
        left={50}
        sx={{
          background: "#fff",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.7)",
        }}
      >
        <Stack
          className="user-image"
          sx={{ borderColor: "white", objectFit: "cover" }}
          overflow={"hidden"}
          maxHeight={"300px"}
          flexGrow={1}
        >
          <img
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
            style={{
              objectFit: "cover",
              width: "100%",
            }}
          />
        </Stack>

        <Stack gap={"20px"} alignItems={"center"} justifyContent={"center"}>
          <Stack
            alignItems={"center"}
            justifyContent={"start"}
            height={"fit-content"}
          >
            <Typography variant="h4">{profile.displayName}</Typography>

            <Typography color={"#91A3B0"}>{profile.bio}</Typography>
          </Stack>

          <Stack direction={"row"} gap={2} className="location&nation">
            <Stack
              className="locations"
              direction={"row"}
              alignItems={"center"}
              gap={1}
            >
              <LocationOnIcon sx={{ color: "#474747" }} />
              <Typography variant="body2">Jajpur Road , Odisha</Typography>
            </Stack>

            <Stack
              className="nation"
              direction={"row"}
              alignItems={"center"}
              gap={1}
            >
              <FlagIcon sx={{ color: "#474747" }} />
              <Typography variant="body2">India</Typography>
            </Stack>
          </Stack>

          <Stack className="socials" paddingY={1}>
            <Stack flexWrap={"wrap"} direction={"row"} gap={2}>
              <Stack
                className="twitter"
                maxWidth={30}
                maxHeight={30}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <img
                  height={"90%"}
                  width={"90%"}
                  src="/png/twitter.png"
                  style={{ objectFit: "cover" }}
                  alt=""
                />
              </Stack>

              <Stack
                className="in"
                maxWidth={30}
                maxHeight={30}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <img
                  height={"80%"}
                  width={"80%"}
                  src="/png/linkedin.png"
                  style={{ objectFit: "cover" }}
                  alt=""
                />
              </Stack>

              <Stack className="mail" maxWidth={30} maxHeight={30}>
                <img
                  height={"100%"}
                  width={"100%"}
                  src="/png/mail.png"
                  style={{ objectFit: "cover" }}
                  alt=""
                />
              </Stack>

              <Stack
                className="slack"
                maxWidth={30}
                maxHeight={30}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <img
                  height={"70%"}
                  width={"70%"}
                  src="/png/slack.jpg"
                  style={{ objectFit: "cover" }}
                  alt=""
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack
            className="followers"
            direction={"row"}
            gap={3}
            width={"100%"}
            justifyContent={"center"}
          >
            <Typography textAlign={"center"}>
              Followers <br />
              <p style={{ fontWeight: "600" }}>{profile.followersCount}</p>
            </Typography>

            <Typography textAlign={"center"}>
              Blogs <br />
              <p style={{ fontWeight: "600" }}>{profile.blogsCount}</p>
            </Typography>

            <Typography textAlign={"center"}>
              Respect <br />
              <p style={{ fontWeight: "600" }}>{profile.respect}</p>
            </Typography>
          </Stack>

          <Stack className="followUp" marginTop={3}>
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
                sx={{ background: "#474747" }}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {isLoading ? (
        <Stack>
          <CircularProgress />
        </Stack>
      ) : (
        <Stack
          height={"130vh"}
          justifyContent={"start"}
          alignItems={"end"}
          gap={5}
          position={"relative"}
        >
          <Stack
            className="data"
            maxWidth={"100%"}
            sx={{
              background: "#fff",
            }}
            position={"relative"}
          >
            <Stack
              className="background-image"
              maxHeight={"260px"}
              justifyContent={"center"}
              alignItems={"center"}
              overflow={"hidden"}
            >
              <img
                src="https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                alt=""
                style={{
                  objectFit: "cover",
                  borderRadius: 18,
                }}
              />
            </Stack>
          </Stack>

          <Stack
            className="blogs"
            width={"1000px"}
            height={"500px"}
            marginRight={"3rem"}
            overflow={"scroll"}
          >
            {/* <Typography variant="h4">
              Blogs
          </Typography> */}
            {blogs.length == 0 && (
              <Stack width={"100%"} alignItems={"center"}>
                <Typography variant="h4">No Blogs Yet</Typography>
              </Stack>
            )}
            {blogs.map((blog, idx) => {
              return (
                <Stack
                  key={idx}
                  className="single-blog-container"
                  borderRadius={2}
                  color={"#474747"}
                  width={"100%"}
                  onClick={() => {
                    window.location.href = `/${blog._id}`;
                  }}
                >
                  <Stack
                    className="single-blog"
                    padding={3}
                    height={"4rem"}
                    direction={"row"}
                    alignItems={"center"}
                    gap={5}
                    position={"relative"}
                  >
                    <Stack
                      sx={{ borderColor: "white", objectFit: "cover" }}
                      overflow={"hidden"}
                      maxHeight={"300px"}
                      width={"9rem"}
                      height={"100%"}
                      minHeight={"90px"}
                    >
                      <img
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          minHeight: "100%",
                        }}
                        src={blog.coverImageURL}
                        alt=""
                      />
                    </Stack>

                    <Stack justifyContent={"center"} flexGrow={1}>
                      <Typography variant="h5">{blog.title}</Typography>
                    </Stack>

                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      gap={3}
                      className="likes&comment"
                      position={"absolute"}
                      right={40}
                    >
                      <Stack direction={"row"} alignItems={"center"} gap={1}>
                        <Typography variant="h6">
                          {(blog.likes as []).length}
                        </Typography>
                        <img
                          src="/png/unclapped.png"
                          alt=""
                          style={{ width: "20px", height: "20px" }}
                        />
                      </Stack>
                      <Stack direction={"row"} alignItems={"center"} gap={1}>
                        <Typography variant="h6">
                          {(blog.comments as []).length}
                        </Typography>
                        <img
                          src="/png/comment.png"
                          alt=""
                          style={{ width: "20px", height: "20px" }}
                        />
                      </Stack>
                    </Stack>

                    <Stack position={"absolute"} top={3} right={40}>
                      <Typography variant="body2">{blog.date}</Typography>
                    </Stack>
                  </Stack>

                  <Divider />
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
