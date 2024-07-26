import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./headeroptions/Header";

const RootLayout = () => {
  return (
    <Stack flexGrow={1}>
      <Header />
      <Stack flexGrow={1} className="pages" sx={{ backgroundColor: "#EFECDC" }}>
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default RootLayout;
