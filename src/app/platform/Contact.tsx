import { Button, Stack, TextField, Typography } from "@mui/material";
import APIMethods from "../../lib/axios/api";
import { useState } from "react";
import AnimatePage from "../../layout/AnimatePage";
export default function Contact() {
  const [mail, setMail] = useState({
    senderEmail: "",
    text: "",
  });

  const sendMail = () => {
    try {
      console.log("clidck");
      if (mail.senderEmail === "" || mail.text === "") {
        return;
      }

      void APIMethods.mail.sendMail(mail);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePage>
      <Stack
        minHeight={"100vh"}
        sx={{ backgroundColor: "background.main" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack direction={"row"} width={"70%"}>
          <Stack>
            <img src="/png/feedback.png" alt="" />
          </Stack>
          <Stack
            flex={1}
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
                onChange={(e) => {
                  setMail({ ...mail, senderEmail: e.target.value });
                }}
                id="standard-basic"
                label="Your Email"
                variant="standard"
              />
              <TextField
                onChange={(e) => {
                  setMail({ ...mail, text: e.target.value });
                }}
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
              <Button
                sx={{ minWidth: "8rem", backgroundColor: "primary.main" }}
                onClick={() => {
                  sendMail();
                }}
              >
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
    </AnimatePage>
  );
}
