/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import APIMethods from "../../lib/axios/api";
import { useState } from "react";
import { Editor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { Heading } from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Highlight from "@tiptap/extension-highlight";
import { SingleBlogTypes } from "./types/blogTypes";
import useLoadingStore from "../../lib/store/useLoading";
import "./preview.css";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import CommentSection from "./components/CommentSection";
import UserProfile from "../user/UserProfile";
// import BookmarkIcon from '@mui/icons-material/Bookmark';

let authorid = "";
export default function ShowBlog() {
  const { blogId } = useParams() as { blogId: string };
  const [blog, setBlog] = useState();
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [likes, setLikes] = useState([]);
  const [isFollowing,setIsFollowing] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [isLoading, setIsLoading] = useLoadingStore((state: any) => [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    state.loading,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    state.setIsLoading,
  ]);

  const fetchBlog = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setIsLoading(true);
    await APIMethods.blog
      .getSingleBlog({ blogId })
      .then((res: SingleBlogTypes) => {
        console.log(res);
        if(res.data.status == 401) {
          window.location.href = "/auth/login";
        }
        if(res.data.status == 404 || res.data.status == 500)
        {
          navigate("/404");
        } 
        else
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setBlog(JSON.parse(res.data.blogs.content));
          setAuthor(res.data.blogs.authorName);
          setDate(res.data.blogs.date);
          setTitle(res.data.blogs.title);
          setCoverImage(res.data.blogs.coverImageURL);
          setLikes(res.data.blogs.likes);
          authorid=res.data.blogs.authorID;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  // };
  const showProfile = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  useEffect(() => {
    fetchBlog()
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [blogId]);

  const follow = async () => {
    const data = {
      userId:authorid,
     id: 
      {
       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
       id: (JSON.parse(localStorage.getItem('user') as string))._id
      }
    }
    const followRes = await APIMethods.user.isFollowingUser(data)
    console.log(followRes);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if(followRes.data.followStatus == 'unfollowing')
    {
      setIsFollowing(false);
    }
    else
    {
      setIsFollowing(true);
    }
  }

  useEffect(() => {
    if (
      blog != null &&
      author !== "" &&
      date !== "" &&
      title !== "" &&
      coverImage !== ""
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setIsLoading(false);
        console.log(isLoading);
      }
    }
  }, [blog, author, date, title, coverImage, setIsLoading, isLoading]);

  interface LikeBlogTypes {
    _id: string;
    displayName: string;
  }

  async function likeBlog() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = JSON.parse(
      localStorage.getItem("user") as string
    ) as unknown as LikeBlogTypes;
    const userId = user._id;
    await APIMethods.blog
      .likeBlog({ userId, blogId })
      .then(async (res:any) => {
        console.log(res);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if(res.data.status == 400) {
          window.location.href = "/auth/login";
        }
        const data = {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          userId: JSON.parse(localStorage.getItem("user") as string)._id as string,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
          message : `👏 ${JSON.parse(localStorage.getItem("user") as string).displayName} clapped to your post!`
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        await APIMethods.user.addNotification(data)
          .then((res:any) => {
            console.log(res);
          })
          .catch((e:any) => {
            console.log(e);
          });

          
        fetchBlog()
          .then((res) => {
            console.log(res);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
        navigate("/auth/login");
      });
  }

  const previewEditor = new Editor({
    content: blog,
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Underline,
      Document,
      Paragraph,
      Highlight.configure({
        multicolor: true,
      }),
      BulletList.configure({
        itemTypeName: "listItem",
        keepMarks: true,
      }),
      OrderedList.configure({
        itemTypeName: "listItem",
        keepMarks: true,
      }),
      Text,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Image,
    ],
  });
  previewEditor.setEditable(false);

  return (
    <Stack
      minHeight={"100vh"}
      justifyContent={"start"}
      alignItems={"center"}
      padding={5}
    >
       <UserProfile authorId={authorid}  isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {
        isLoading? <Stack minHeight={'100vh'}>
          <CircularProgress />
        </Stack>:
      
      <Stack
        width={"900px"}
        justifyContent={"center"}
        alignItems={"start"}
        gap={2}
      >
        <Stack
          direction={"column"}
          gap={1}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
        >
          <img
            src={coverImage}
            alt=""
            style={{ width: "900px", maxHeight: "500px", objectFit: "cover" }}
          />
          <Typography variant="h3">{title}</Typography>
        </Stack>

        <Stack
          direction={"row"}
          gap={2}
          alignItems={"center"}
          position={"relative"}
          width={"100%"}
        >
          <Avatar
            src={
              "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
            }
            alt={"name"}
          />
          <Stack justifyContent={'flex-start'} alignItems={'flex-start'} gap={'3px'}>
          <div style={{cursor:'pointer'}}>
          <Typography onClick={showProfile} sx={{ 
            '&:hover' : {
              color:'#646F76',
              textDecoration:'underline',
            }
          }}>
            {author}
          </Typography>
          </div>
            <Typography variant="caption">{date}</Typography>
          </Stack>
          <Button
          onClick={follow}
            sx={{ background: "#474747", position: "absolute", right: 0 }}
          >
            {
              isFollowing ? "Unfollow" : "Follow"
            }
          </Button>
        </Stack>

        <Stack></Stack>
        <Divider sx={{ width: "100%", background: "#A9A9A9" }} />

        <Stack
          direction={"row"}
          gap={2}
          paddingY={1}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Stack className="left" direction={"row"} gap={3} marginLeft={2}>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <IconButton onClick={likeBlog}>
                <img
                  src="./png/unclapped.png"
                  alt=""
                  style={{ width: "20px" }}
                />
              </IconButton>
              <Typography>{likes.length}</Typography>
            </Stack>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <CommentSection blogId={blogId} />
            </Stack>
          </Stack>

          <Stack className="right" direction={"row"} gap={1} marginRight={2}>
            <IconButton>
              <BookmarkBorderIcon />
            </IconButton>

            <IconButton>
              <ShareIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Divider sx={{ width: "100%", background: "#A9A9A9" }} />

        <EditorContent
          className="previeweditor"
          editor={previewEditor}
          style={{
            overflow: "scroll",
            minHeight: "450px",
          }}
        />
      </Stack>
      }
    </Stack>
  );
}
