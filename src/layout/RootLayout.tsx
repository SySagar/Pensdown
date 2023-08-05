import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const RootLayout = () => {
  return (
    <Stack flexGrow={1}>
      <Header />
      <Stack flexGrow={1} className="pages">
        <Outlet />
      </Stack>
      <Footer />
    </Stack>
  );
};

export default RootLayout;
