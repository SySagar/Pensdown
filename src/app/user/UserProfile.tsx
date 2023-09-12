import { Button, IconButton, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function UserProfile({ isOpen , onClose }: any) {
  return (
    <motion.div
      className="sidebar"
      initial={{ x: "-100%" }}
      style={{
        position: "fixed",
        top: 0,
        right: -500,
        zIndex: 10,
      }}
      animate={isOpen ? { x: -500 } : { x: "100%" }}
      transition={{ type: "tween" }}
    >
      <Stack
        position={"fixed"}
        top={0}
        right={0}
        bottom={0}
        minWidth={"25rem"}
        minHeight={"100vh"}
        sx={{ background: "#fff", borderRadius: "8px 0px 0px 8px" }}
      >

        <Stack height={'100%'} position={'relative'}>

            <Stack position={'absolute'} top={10} left={10}>
              <IconButton
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                onClick={onClose}
              >
                <ArrowBackIcon />
              </IconButton>
            </Stack>

        <Stack
          margin={4}
          marginTop={8}
          border={2}
          borderColor={"#BDBDBD"}
          height={"100%"}
          borderRadius={5}
          position={"relative"}
        >
          <img
            src="https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
            alt=""
            width={"100%"}
            style={{
              objectFit: "cover",
              borderRadius: 18,
            }}
          />

          <Stack
            position={"absolute"}
            bottom={0}
            gap={4}
            borderRadius={5}
            minHeight={"70%"}
            width={"100%"}
            sx={{ background: "white" }}
            alignItems={"center"}
          >

            <Stack
              marginTop={-6}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <img
                 src={
                  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                }alt=""
                width={"100px"}
                height={"100px"}
                style={{
                  objectFit: "cover",
                  borderRadius: '100%',
                }}
              />
            </Stack>
            

            <Stack alignItems={"center"}>
              <Typography fontWeight={500} variant="h5">Soumya Sagar</Typography>

              <Typography fontWeight={600} variant={"body2"}>@soumyasagar</Typography>

            </Stack>

            <Stack justifyContent={'center'} alignItems={'center'} paddingX={4}>

              <Typography variant={"body2"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              </Typography>
            </Stack>

            <Stack direction={"row"} gap={3} marginTop={3}>
              <Stack direction={"column"} alignItems={"center"}>
                <Typography variant={"body1"}>Blogs</Typography>
                <Typography fontWeight={600}>10k</Typography>
              </Stack>

              <Stack direction={"column"} alignItems={"center"}>
                <Typography variant={"body1"}>Followers</Typography>
                <Typography fontWeight={600}>86</Typography>
              </Stack>

              <Stack direction={"column"} alignItems={"center"}>
                <Typography variant={"body1"}>Respect</Typography>
                <Typography fontWeight={600}>12.5k</Typography>
              </Stack>
            </Stack>

            <Stack>
              <Button variant="contained" sx={{background:'#474747',color:'white'}}>
                Follow
              </Button>
            </Stack>

          </Stack>

     

        </Stack>
        
        </Stack>
      </Stack>
    </motion.div>
  );
}
