import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useFormik } from "formik";
import { useState } from "react";
import { profileSchema } from "./validation";
import useRegisterStore from "./hooks/useRegisterStore";
import {
  Alert,
  Button,
  CircularProgress,
  Collapse,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function CreateAccount() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [setActiveStep, profile, setProfile] = useRegisterStore((state) => [
    state.setActiveStep,
    state.profile,
    state.setProfile,
  ]);

  //console.log("profile", user);

  const formik = useFormik({
    initialValues: {
      name: profile.name,
      username: profile.username,
      bio: profile.bio,
    },
    onSubmit: (values) => {
      try {
        setIsLoading(() => true);
        console.log("step 2 done");

        setProfile(values);

        setActiveStep(1);
      } catch (error: any) {
        console.log("error while login", error);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setError(() => error.response.data as string);
      }
    },
    validationSchema: profileSchema,
  });

  return (
    <>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        gap={"20px"}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Typography variant="h5" color={"text.secondary"}>
          Complete your profile
        </Typography>

        <Collapse in={error ? true : false}>
          <Alert severity="error">{error}</Alert>
        </Collapse>

        <Stack width={"100%"} color={"primary.main"} gap={1}>
          <Typography variant="body2">Username</Typography>
          <TextField
            label=""
            name="username"
            variant="outlined"
            fullWidth
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.username && formik.errors.username ? true : false
            }
            helperText={formik.errors.username}
            required
          />
        </Stack>
        <Stack width={"100%"} color={"primary.main"} gap={1}>
          <Typography variant="body2">Name</Typography>
          <TextField
            label=""
            name="name"
            variant="outlined"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name ? true : false}
            helperText={formik.errors.name}
            required
          />
        </Stack>
        <Stack width={"100%"} color={"primary.main"} gap={1}>
          <Typography variant="body2">Bio</Typography>
          <TextField
            name="bio"
            label=""
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bio && formik.errors.bio ? true : false}
            helperText={formik.errors.bio}
            required
          />
        </Stack>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            formik.handleSubmit();
          }}
          sx={{ height: "65px", borderRadius: "100%", scale: "0.8" }}
        >
          {isLoading ? <CircularProgress size={25} /> : <ArrowForwardIcon />}
        </Button>
      </Stack>
    </>
  );
}
