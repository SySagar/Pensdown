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
import { useEffect } from "react";
import APIMethods from "./lib/axios/api";
import CreateBlog from "./app/blog/CreateBlog";

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
          }
        ],
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
	
  const verifyToken = async () => {
    const token = localStorage.getItem("accessToken") as string;
    const isValidToken = await APIMethods.verify.verifyToken(token);

    if (isValidToken) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  useEffect(() => {
    verifyToken()
      .then(() => console.log("token verified"))
      .catch((e) => {
        console.log("token not verified");
        console.log("error", e);
      });
  }, []);

  return (
    <Stack sx={{ background: "#BDBDBD" }}>
      <RouterProvider router={router} />
    </Stack>
  );
}

export default App;
