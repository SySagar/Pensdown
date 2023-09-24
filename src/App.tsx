import "./App.css";
import "./fonts/Raleway.ttf";
import "./fonts/Inconsolata.ttf";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./app/home/HeroPage";
import Login from "./app/auth/Login";
import Register from "./app/auth/Register";
import NotFound from "./app/misc/NotFound";
import { Stack } from "@mui/material";
import PrivateRoutes from "./lib/utils/protectedRoutes";
import CreateBlog from "./app/blog/CreateBlog";
import ShowBlog from "./app/blog/ShowBlog";
import NotBlog from "./app/misc/NoBlog";
import AboutUser from "./app/user/AboutUser";
import About from "./app/platform/About";
import Contact from "./app/platform/Contact";
import SearchedBlogs from "./app/home/components/SearchedBlogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/:blogId",
    element: <ShowBlog />,
  },
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/user/:userId",
        element: <AboutUser />,
      },
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
            path: "/404",
            element: <NotBlog />,
          },
          {
            path: "/search/:blogSearched",
            element: <SearchedBlogs />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
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
    <Stack sx={{ background: "#F8FBF8" }}>
      <RouterProvider router={router} />
    </Stack>
  );
}

export default App;
