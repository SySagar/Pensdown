import { CircularProgress, Stack, Typography } from '@mui/material'
import { useEffect,useState } from 'react'
import APIMethods from '../../lib/axios/api'
import './notification.css'

export default function Notification() {

    const [notifications, setNotifications] = useState<string[]>([]) ;

    function reverseString(input:string) {
        let reversed = '';
        for (const char of input) {
          reversed = char + reversed;
        }
        return reversed;
      }

    const fetchNotification = async () => {
        try {
            const userString = localStorage.getItem("user");
            if (userString) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                const userId = JSON.parse(userString)._id as unknown as string;
                const response = await APIMethods.user.getNotifications({ userId });
                // console.log(response.data);

                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const cachedNotifications = JSON.parse(localStorage.getItem("notifications") as string);
                console.log(cachedNotifications)
                if(!cachedNotifications){
                    localStorage.setItem("notifications", JSON.stringify(['Welcome to the app!']));
                    setNotifications(['Welcome to the app!']);
                }
                else
                {
                    if (response.data=='no new notification'){
                        //do nothing
                        
                        
                        if(cachedNotifications)
                        setNotifications(cachedNotifications as string[]);
    
                    }
                    else
                    {
                        
                        setNotifications([
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            ...cachedNotifications,
                            ...response.data as string[],
                        ]);
                    }
                }
             
            } else {
                console.log("User not found in localStorage.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNotification().then((res) => {
            console.log(res);
        }
        ).catch((e) => {
            console.log(e);
        }
        )
    }, [])

    useEffect(() => {
        if(notifications && notifications.length!=0)
        {localStorage.setItem("notifications", JSON.stringify(notifications));}
    }, [notifications]);

  return (
    <Stack minWidth={350} minHeight={400} >
        {
        

            notifications.length!=0 ?(
                
                notifications.slice().reverse().map((singleItem,idx) => {
                    return (
                    <Stack key={idx} className='inNots' width={350} padding={2} paddingY={3} borderBottom={1} borderColor={'grey'}>
                        <Typography>
                        {singleItem}
                        </Typography>
                        </Stack>
                )
            }
            )
            ):(
                <Stack justifyContent={'center'} alignItems={'center'} minHeight={400}>
                    <CircularProgress color="secondary" /> 
                </Stack>
            )
        
        }
        </Stack>
        )
        
    }
    