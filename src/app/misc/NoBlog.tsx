import { Button, Stack, Typography } from "@mui/material";
import Lottie404 from "../../assets/noBlog.json";
import Lottie from "react-lottie";
import Page from "../../layout/Page";
import { useNavigate } from "react-router-dom";

export default function NotBlog() {
  const navigate = useNavigate();
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
      <Stack direction="column" minHeight={'95vh'} justifyContent={'center'} alignItems={'center'}>

        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} >

        <Typography marginBottom={10} width={500} textAlign={'left'} variant="h5" color={'secondary'}>
          <Typography variant="h2" color={'red'}>
            Whooops!
            </Typography>
          Looks like the blog you are searching for does not exists.
        </Typography>

        <Lottie options={defaultOptions} height={420} width={500} />
        </Stack>
      
      <Button color="secondary" variant="contained" onClick={
        () => {
          navigate(-1);
        }
      }>Go back</Button>
      </Stack>
    </Page>
  );
}
