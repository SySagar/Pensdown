/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Avatar, Button, IconButton, Stack } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useWriterAction from "../../lib/store/useWriterAction";
import { useEffect } from "react";
import APIMethods from "../../lib/axios/api";
import useEditorContent from "../../lib/store/useEditorContent";
import { useNavigation } from "react-router-dom";

const AuthorizedActions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.pathname);
  const [isWriting, setIsWriting,setNotWriting] = useWriterAction((state: any) => [
    state.isWriting,
    state.setWriting,
    state.setNotWriting
  ]);

  useEffect(() => {

    if (location.pathname !== "/blog/create") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setNotWriting();
    }
    else{
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setIsWriting();
    }
  
  }, [location.pathname, setIsWriting, setNotWriting]);

  
  const [blog] = useEditorContent((state:any)=>[state.blog,state.setBlog]);
  const handleSubmit = async () => {
    console.log("submit");


    console.log(blog);
    await APIMethods.blog.createBlog(blog).then((res) => {
      console.log("res", res.status);
    });

    navigate('/')

  };

  return (
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
      {isWriting && (
        <Button
          variant="contained"
          sx={{
            height: "30px",
            marginRight: "20px",
            background: "#00A36C",
            color: "white",
            '&:hover': {
              background: '#00A36C',
            }
          }}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleSubmit}
        >
          Publish
        </Button>
      )}
      {!isWriting && (
        <IconButton component={Link} to={"/blog/create"} onClick={setIsWriting}>
          <Avatar
            sx={{ width: "25px", height: "25px" }}
            src="/png/write.png"
            alt={"name"}
          />
        </IconButton>
      )}
      <IconButton>
        <NotificationsIcon />
      </IconButton>
      <IconButton>
        <Avatar
          src={
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
          }
          alt={"name"}
        />
      </IconButton>
    </Stack>
  );
};

const UnauthorizedActions = () => {
  return (
    <Stack direction={"row"} gap={1}>
      <Button component={Link} to={"/auth/login"} variant={"outlined"}>
        Login
      </Button>
      <Button component={Link} to={"/auth/register"} variant={"contained"}>
        Register
      </Button>
    </Stack>
  );
};

const HeaderActions = ({ children }: any) => {
  return (
    <Stack direction="row" gap="8px" alignItems="center">
      {children}
    </Stack>
  );
};

HeaderActions.AuthorizedActions = AuthorizedActions;
HeaderActions.UnAuthorizedActions = UnauthorizedActions;

export default HeaderActions;
