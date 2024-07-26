/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import APIMethods from "../../lib/axios/api";
import { loginSchema } from "./validation";
import { useState } from "react";
import { VisibilityOff, VisibilityRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AnimatePage from "../../layout/AnimatePage";

interface userProps {
  name: string;
  email: string;
  _id: string;
}

interface userResponse {
  token: string;
  user: userProps;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loginNotify = () => toast.success(`Successfully logged in!`);
  const errorNotify = () => toast.error(`Something went wrong! Try again!`);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      try {
        const data = {
          email,
          password,
        };
        // console.log("data", data);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { token, user }: userResponse = (
          await APIMethods.auth.login(data)
        ).data;
        console.log("accessToken", token);
        console.log("user", user);

        if (token && user) {
          localStorage.setItem("accessToken", token);
          localStorage.setItem("user", JSON.stringify(user));

          loginNotify();
          navigate("/");
        } else {
          setError(() => "Invalid credentials");
          errorNotify();
        }
      } catch (error: any) {
        console.log("erro while login", error);

        setError(() => error.response.data as string);
      }
    },
    validationSchema: loginSchema,
  });

  const togglePasswordVisibility = () => {
    setShowPassword((showPassword) => !showPassword);
  };
  console.log("formik", showPassword);
  return (
    <Stack
      minHeight={"100vh"}
      direction={"row"}
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "background.main",
      }}
    >
      <AnimatePage>
        <Stack
          minWidth={"60vw"}
          sx={{
            background: "#FFF0EA",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            height={"100%"}
            flexGrow={1}
          >
            <Stack
              className="form"
              padding={"80px"}
              gap={"20px"}
              justifyContent="center"
              alignItems="flex-start"
              direction={"column"}
              flexGrow={1}
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              <Stack minHeight={"100%"} gap={"5px"}>
                <Typography fontWeight={700} variant="h4">
                  Welcome back
                </Typography>
                <Typography fontWeight={100} color={"grey"} variant="body2">
                  Please enter your details
                </Typography>
              </Stack>

              <Collapse in={error ? true : false}>
                <Alert severity="error">{error}</Alert>
              </Collapse>

              <Stack width={"100%"} marginTop={"10px"} gap={1}>
                <Typography variant="body2" color={"primary.main"}>
                  Email
                </Typography>
                <TextField
                  label=""
                  name="email"
                  variant="outlined"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.email && formik.errors.email ? true : false
                  }
                  helperText={formik.errors.email}
                  required
                />
              </Stack>
              <Stack width={"100%"} gap={1}>
                <Typography variant="body2" color={"primary.main"}>
                  Password
                </Typography>
                <TextField
                  name="password"
                  label=""
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && formik.errors.password
                      ? true
                      : false
                  }
                  helperText={formik.errors.password}
                  required
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => togglePasswordVisibility()}>
                        {showPassword ? (
                          <VisibilityRounded />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Stack>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => formik.handleSubmit()}
                sx={{ marginTop: "20px" }}
              >
                Sign in
              </Button>

              <Stack width={"100%"} alignItems={"center"}>
                <Typography variant="caption" color={"grey"}>
                  Don't have an account?{" "}
                  <a
                    href="/auth/register"
                    style={{
                      textDecoration: "none",
                      fontWeight: "700",
                      color: "#478585",
                    }}
                  >
                    Sign up for free
                  </a>
                </Typography>
              </Stack>
            </Stack>
            <Box
              component={Stack}
              flexGrow={1}
              justifyContent="center"
              alignItems="center"
              overflow={"hidden"}
            >
              <img
                src="https://images.unsplash.com/photo-1578852612716-854e527abf2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                style={{
                  borderRadius: "10px",
                  objectFit: "cover",
                  width: "100%",
                }}
                alt=""
              />
            </Box>
          </Stack>
        </Stack>
      </AnimatePage>
    </Stack>
  );
}
