import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import APIMethods from "../../../lib/axios/api";
import {
  Avatar,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import { BlogCommentTypes, CommentTypes } from "../types/blogTypes";
import useLoadingStore from "../../../lib/store/useLoading";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

type Anchor = "right";

export default function CommentSection({ blogId }: { blogId: string }) {
  const [state, setState] = useState({
    right: false,
  });
  const [comments, setComments] = useState<CommentTypes[]>([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const [isLoading, setIsLoading] = useLoadingStore((state: any) => [state.loading,state.setIsLoading,]);

  const fetchComments = async () => {
    await APIMethods.blog
      .getComments({ blogId })
      .then((res: { data: [] }) => {
        setComments([]);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setIsLoading(true);
        res.data.map((item: BlogCommentTypes) => {
          const data = {
            comment: item.comment,
            createdAt: item.createdAt,
            author: item.authorId.displayName,
          };

          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
          setComments((prev: any) => [...prev, data]);
        });
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const addComment = async () => {
    const { _id } = JSON.parse(localStorage.getItem("user") as string) as {
      _id: string;
    };
    await APIMethods.blog
      .addComment({ blogId, comment: newComment, authorId: _id })
      .then((res) => {
        console.log(res);
        setNewComment("");
        fetchComments()
          .then((res) => {
            console.log(res);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      addComment().then(async () => {
        const data = {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          userId: JSON.parse(localStorage.getItem("user") as string)._id as string,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
          message : `🎐 ${JSON.parse(localStorage.getItem("user") as string).displayName} commented ${newComment}`
        }
        if(!data || !data.userId || !data.message) 
        navigate('/auth/login');
      
        await APIMethods.user.addNotification(data)
          .then((res) => {
            console.log(res);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
        navigate('/auth/login');
      });
    }
  };

  useEffect(() => {
    console.log("useEffect");
    fetchComments()
      .then((res) => {
        console.log(res);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ height: "100%", width: 500, background: "#FAF7FF" }}
      padding={2}
      role="comments"
    >
      <Stack position={'relative'}>
        <Stack width={'100%'} direction={'row'} justifyContent={'flex-end'} 
            onClick={toggleDrawer(anchor, false)}> 
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Stack>
        <TextField
          variant="outlined"
          value={newComment}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setNewComment(e.target.value);
            toggleDrawer(anchor, true);
          }}
          sx={{
            marginBottom: 2,
          }}
          placeholder="What are your thoughts?"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    addComment()
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  }}
                  aria-label="toggle password visibility"
                  edge="end"
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      {comments.map((singleComment, idx) => {
        return (
          <Stack gap={2} key={idx} className="list-comment" paddingY={1}>
            <Stack
              className="meta-data"
              direction={"row"}
              gap={1}
              alignItems={"center"}
            >
              <Avatar
                alt="Remy Sharp"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              />
              <Stack>
                <Typography variant="body2">{singleComment.author}</Typography>
                <Typography variant="caption">
                  {singleComment.createdAt}
                </Typography>
              </Stack>
            </Stack>
            <Stack className="comment">
              <Typography>{singleComment.comment}</Typography>
            </Stack>
          </Stack>
        );
      })}
    </Box>
  );

  return (
    <>
      {(["right"] as const).map((anchor) => (
        <Stack key={anchor}>
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <IconButton onClick={toggleDrawer(anchor, true)}>
              <img src="./png/comment.png" alt="" style={{ width: "20px" }} />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </Stack>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
          >
            {isLoading ? <Typography>Loading...</Typography> : list(anchor)}
          </Drawer>
        </Stack>
      ))}
    </>
  );
}
