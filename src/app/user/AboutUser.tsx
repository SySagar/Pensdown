import { Button, Divider, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
import './user.css'

export default function AboutUser() {
  return (
    <Stack
      minHeight={"130vh"}
      justifyContent={"start"}
      alignItems={"end"}
      gap={5}
      position={'relative'}
    >

<Stack
        className="user-card-profile"
          paddingBottom={5}
          justifyContent={"start"}
          alignItems={"center"}
          maxWidth={"360px"}
          direction={"column"}
          zIndex={3}
          gap={3}
          position={'absolute'}
          top={30}
          left={50}
          sx={{
            background: "#fff",
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)'
          }}
        >
          <Stack
            className="user-image"
            sx={{ borderColor: "white", objectFit: "cover" }}
            overflow={"hidden"}
            maxHeight={"300px"}
            flexGrow={1}
          >
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
              style={{
                objectFit: "cover",
                width: "100%",
              }}
            />
          </Stack>

          <Stack gap={"20px"} alignItems={"center"} justifyContent={'center'}>
            <Stack
              alignItems={"center"}
              justifyContent={"start"}
              height={"fit-content"}
            >
              <Typography variant="h4">Soumya Sagar</Typography>

              <Typography color={"#91A3B0"}>
                some random shit about me :-)
              </Typography>
            </Stack>

            <Stack direction={"row"} gap={2} className="location&nation">
              <Stack
                className="locations"
                direction={"row"}
                alignItems={"center"}
                gap={1}
              >
                <LocationOnIcon sx={{ color: "#474747" }} />
                <Typography variant="body2">Jajpur Road , Odisha</Typography>
              </Stack>

              <Stack
                className="nation"
                direction={"row"}
                alignItems={"center"}
                gap={1}
              >
                <FlagIcon sx={{ color: "#474747" }} />
                <Typography variant="body2">India</Typography>
              </Stack>
            </Stack>

            <Stack className="socials" paddingY={1}>
              <Stack flexWrap={"wrap"} direction={"row"} gap={2}>
                <Stack
                  className="twitter"
                  maxWidth={30}
                  maxHeight={30}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <img
                    height={"90%"}
                    width={"90%"}
                    src="/png/twitter.png"
                    style={{ objectFit: "cover" }}
                    alt=""
                  />
                </Stack>

                <Stack
                  className="in"
                  maxWidth={30}
                  maxHeight={30}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <img
                    height={"80%"}
                    width={"80%"}
                    src="/png/linkedin.png"
                    style={{ objectFit: "cover" }}
                    alt=""
                  />
                </Stack>

                <Stack className="mail" maxWidth={30} maxHeight={30}>
                  <img
                    height={"100%"}
                    width={"100%"}
                    src="/png/mail.png"
                    style={{ objectFit: "cover" }}
                    alt=""
                  />
                </Stack>

                <Stack
                  className="slack"
                  maxWidth={30}
                  maxHeight={30}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <img
                    height={"70%"}
                    width={"70%"}
                    src="/png/slack.jpg"
                    style={{ objectFit: "cover" }}
                    alt=""
                  />
                </Stack>
              </Stack>
            </Stack>

            <Stack className="followers" direction={'row'} gap={3} width={'100%'}>
              <Typography textAlign={'center'} >
                Followers <br/> 
                <p style={{fontWeight:'600'}}>
                    76
                    </p>
              </Typography>

              <Typography textAlign={'center'}>
                Following <br/> 
                <p style={{fontWeight:'600'}}>
                    12
                    </p>
              </Typography>

              <Typography textAlign={'center'}>
                Respect <br/> 
                <p style={{fontWeight:'600'}}>
                    120
                    </p>
              </Typography>
            </Stack>

            <Stack className="followUp" marginTop={3}>
              <Button variant="contained">
              Follow
              </Button>
            </Stack>
          </Stack>
</Stack>

      <Stack
        className="data"
        maxWidth={"100%"}
        sx={{
          background: "#fff",
        }}
        position={"relative"}
      >
        <Stack
          className="background-image"
          maxHeight={"260px"}
          justifyContent={"center"}
          alignItems={"center"}
          overflow={"hidden"}
        >
          <img
            src="https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
            alt=""
            style={{
              objectFit: "cover",
              borderRadius: 18,
            }}
          />
        </Stack>

      
     
      </Stack>

      <Stack
        className="blogs"
        width={"1000px"}
        height={"500px"}
        marginRight={'3rem'}
        overflow={'scroll'}
        border={2}
      >
        {/* <Typography variant="h4">
            Blogs
        </Typography> */}

        <Stack className="single-blog-container" borderRadius={2} color={'#474747'}  width={'100%'} >
                <Stack className="single-blog"padding={3} height={'6rem'} direction={'row'} gap={5}>
                    <Stack
                         sx={{ borderColor: "white", objectFit: "cover" }}
                         overflow={"hidden"}
                         maxHeight={"340px"}
                         width={'10rem'}
                    >

                    <img
                    style={{
                        objectFit:'cover',
                        width:'100%',
                        height:'auto'
                    }} 
                    src="https://plus.unsplash.com/premium_photo-1683890752499-af648bbdb573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="" />
                    </Stack>

                    <Stack 
                    justifyContent={'center'}
                         flexGrow={1}>
                        <Typography variant="h4">
                            New Blog
                        </Typography>
                    </Stack>
                </Stack>

                <Divider />
        </Stack>
        <Stack className="single-blog-container" borderRadius={2} color={'#474747'}  width={'100%'} >
                <Stack className="single-blog"padding={3} height={'6rem'} direction={'row'} gap={5}>
                    <Stack
                         sx={{ borderColor: "white", objectFit: "cover" }}
                         overflow={"hidden"}
                         maxHeight={"340px"}
                         width={'10rem'}
                    >

                    <img
                    style={{
                        objectFit:'cover',
                        width:'100%',
                        height:'auto'
                    }} 
                    src="https://plus.unsplash.com/premium_photo-1683890752499-af648bbdb573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="" />
                    </Stack>

                    <Stack 
                    justifyContent={'center'}
                         flexGrow={1}>
                        <Typography variant="h4">
                            New Blog
                        </Typography>
                    </Stack>
                </Stack>

                <Divider />
        </Stack>
        <Stack className="single-blog-container" borderRadius={2} color={'#474747'}  width={'100%'} >
                <Stack className="single-blog"padding={3} height={'6rem'} direction={'row'} gap={5}>
                    <Stack
                         sx={{ borderColor: "white", objectFit: "cover" }}
                         overflow={"hidden"}
                         maxHeight={"340px"}
                         width={'10rem'}
                    >

                    <img
                    style={{
                        objectFit:'cover',
                        width:'100%',
                        height:'auto'
                    }} 
                    src="https://plus.unsplash.com/premium_photo-1683890752499-af648bbdb573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="" />
                    </Stack>

                    <Stack 
                    justifyContent={'center'}
                         flexGrow={1}>
                        <Typography variant="h4">
                            New Blog
                        </Typography>
                    </Stack>
                </Stack>

                <Divider />
        </Stack>

        <Stack className="single-blog-container" borderRadius={2} color={'#474747'}  width={'100%'} >
                <Stack className="single-blog"padding={3} height={'6rem'} direction={'row'} gap={5}>
                    <Stack
                         sx={{ borderColor: "white", objectFit: "cover" }}
                         overflow={"hidden"}
                         maxHeight={"340px"}
                         width={'10rem'}
                    >

                    <img
                    style={{
                        objectFit:'cover',
                        width:'100%',
                        height:'auto'
                    }} 
                    src="https://plus.unsplash.com/premium_photo-1683890752499-af648bbdb573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="" />
                    </Stack>

                    <Stack 
                    justifyContent={'center'}
                         flexGrow={1}>
                        <Typography variant="h4">
                            New Blog
                        </Typography>
                    </Stack>
                </Stack>

                <Divider />
        </Stack>
        
      </Stack>
    </Stack>
  );
}
