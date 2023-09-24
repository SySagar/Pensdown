/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, Stack, Typography } from "@mui/material";
import useRegisterStore from "./hooks/useRegisterStore";
import CreateAccount from "./CreateAccount";
import CompleteProfile from "./CompleteProfile";
import Suggestion from "./Suggestion";

export default function Register() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
  const [activeStep] = useRegisterStore((state) => [state.activeStep]);

  return (
    <Stack
      minHeight={"100vh"}
      direction={"row"}
      justifyContent="center"
      alignItems="center"
    >
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
          >
            <Stack minHeight={"100%"}>
              <Typography fontWeight={700} variant="h4">
                Hello writer!
              </Typography>
              <Typography fontWeight={100} color={"grey"} variant="body2">
                Lets get you on board
              </Typography>
            </Stack>

            {/* <Collapse in={error ? true : false}>
              <Alert severity="error">{error}</Alert>
            </Collapse> */}

            <Stack gap={5} alignItems={"center"}>
              {activeStep === 0 && <CreateAccount />}

              {activeStep === 1 && <CompleteProfile />}

              {activeStep === 2 && <Suggestion />}
            </Stack>
          </Stack>
          {activeStep != 2 && (
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
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
