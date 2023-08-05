import { Button, Stack, Typography } from "@mui/material";
import Lottie404 from "../../assets/404.json";
import Lottie from "react-lottie";
import Page from "../../layout/Page";

export default function NotFound() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Lottie404,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Page>
      <Stack gap={5} direction="column" minHeight={'100vh'} justifyContent={'center'} alignItems={'center'}>
        <Typography variant="h4" color={'#FF0800'}>
          Whooops..........Looks like you are lost!
        </Typography>

        <Lottie options={defaultOptions} height={420} width={500} />
      
      <Button  variant="contained">Go back</Button>
      </Stack>
    </Page>
  );
}
