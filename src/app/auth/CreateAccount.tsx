import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useFormik } from "formik";
import { useState } from "react";
import { registerSchema } from "./validation";
import useRegisterStore from "./hooks/useRegisterStore";
import {
  Alert,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { VisibilityOff } from "@mui/icons-material";

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [setActiveStep, setUser, user] = useRegisterStore((state) => [
    state.setActiveStep,
    state.setUser,
    state.user,
  ]);

  const formik = useFormik({
    initialValues: {
      email: user!.email,
      password: user!.password,
    },
    onSubmit: (values) => {
      try {
        setIsLoading(true);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { email, password } = values;
        setUser({
          email,
          password,
        });
        console.log("step 1 done");
        setIsLoading(false);
        setActiveStep(1);
      } catch (error: any) {
        console.log("error while login", error);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setError(() => error.response.data as string);
      }
    },
    validationSchema: registerSchema,
  });

  const togglePasswordVisibility = () => {
    setShowPassword((v) => !v);
  };

  return (
    <>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        gap={"20px"}
        marginTop={"20px"}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Typography variant="h5" color={"text.secondary"}>
          Create your account
        </Typography>

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
            error={formik.touched.email && formik.errors.email ? true : false}
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
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password && formik.errors.password ? true : false
            }
            helperText={formik.errors.password}
            required
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => togglePasswordVisibility()}>
                  {showPassword ? <VisibilityOff /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
        </Stack>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => formik.handleSubmit()}
          sx={{ height: "65px", borderRadius: "100%", scale: "0.8" }}
        >
          {isLoading ? <CircularProgress size={25} /> : <ArrowForwardIcon />}
        </Button>
      </Stack>
    </>
  );
}
