import "./App.css";
import "./fonts/Raleway.ttf";
import "./fonts/Inconsolata.ttf";
import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./app/home/HeroPage";
import Login from "./app/auth/Login";
import Register from "./app/auth/Register";
import NotFound from "./app/misc/NotFound";
import { Stack } from "@mui/material";
import PrivateRoutes from "./lib/utils/protectedRoutes";
import CreateBlog from "./app/blog/CreateBlog";
import ShowBlog from "./app/blog/ShowBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/blog/create",
            element: <CreateBlog />,
          },
          {
            path: "/:blogId",
            element: <ShowBlog />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {


  return (
    <Stack sx={{ background: "#BDBDBD" }}>
      <RouterProvider router={router} />
    </Stack>
  );
}

export default App;
