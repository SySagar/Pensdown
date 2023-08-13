/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Avatar, Button, IconButton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";

const AuthorizedActions = () => {
  return (
    <Stack direction={"row"}>
      <IconButton>
        <Avatar sx={{width:'25px',height:'25px'}} src="/png/write.png" alt={"name"} />
      </IconButton>
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
