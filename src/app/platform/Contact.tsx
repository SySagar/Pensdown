import { Button, Stack, TextField, Typography } from "@mui/material";

export default function Contact() {
  return (
    <Stack
      minHeight={"100vh"}
      sx={{ background: "#F8FBF8" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack direction={"row"} width={"70%"}>
        <Stack>
          <img src="/png/feedback.png" alt="" />
        </Stack>
        <Stack
          sx={{
            background: "white",
          }}
          border={1}
          borderRadius={5}
          paddingBottom={4}
          minHeight={100}
          flexGrow={1}
          borderColor={"#BDBDBD"}
        >
          <Stack gap={4} padding={5}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
              }}
            >
              We would love to hear from you!
            </Typography>
            <TextField
              id="standard-basic"
              label="Your Name"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Your Email"
              variant="standard"
            />
            <TextField
              id="outlined-multiline-static"
              label="Something you want to share with us..."
              multiline
              rows={6}
              variant="outlined"
              sx={{
                marginTop: "6px",
              }}
            />
          </Stack>
          <Stack justifyContent={"center"} alignItems={"center"}>
            <Button sx={{ minWidth: "8rem", background: "#474747" }}>
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Submit
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
