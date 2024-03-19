import { Link, Stack, Typography } from "@mui/material";
import HeaderActions from "./HeaderActions";
import styles from "./header.module.css";
import { useResponsive } from "../../hooks/useResponsive";

export default function Header() {
  const token = localStorage.getItem("accessToken");
  const { isTablet } = useResponsive();

  return (
    <Stack
      className="navbar"
      width={"100%"}
      minHeight={"50px"}
      justifyContent={"center"}
      sx={{
        background: "#F5F5F5",
      }}
    >
      <Stack
        className="navbar-container"
        paddingX={3}
        paddingY={1}
        direction={"row"}
        alignItems={"center"}
      >
        <Stack direction={"row"} gap={1}>
          <img
            style={{ width: 25, height: 25 }}
            src="/png/mainicon.png"
            alt=""
          />
          <Typography
            className={styles.logo}
            component={Link}
            href="/"
            style={{
              textDecoration: "none",
            }}
            fontSize={isTablet ? "15px" : "20px"}
            fontWeight={500}
          >
            Pensdown
          </Typography>
        </Stack>

        <Stack flexGrow={1}></Stack>

        <Stack>
          <HeaderActions>
            {token ? (
              <HeaderActions.AuthorizedActions />
            ) : (
              <HeaderActions.UnAuthorizedActions />
            )}
          </HeaderActions>
        </Stack>
      </Stack>
    </Stack>
  );
}
