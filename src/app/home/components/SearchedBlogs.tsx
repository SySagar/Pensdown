import { CircularProgress, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import APIMethods from '../../../lib/axios/api'
import useLoadingStore from '../../../lib/store/useLoading'
import { blogTypes } from '../../blog/types/blogTypes'
import useSearchStore from '../../../lib/store/useSearchStore'
import { useState } from 'react'
import Blog from './Blog'

export default function SearchedBlogs() {

    const { isLoading, setIsLoading } = useLoadingStore();
    const [blogs,setBlogs] = useState<blogTypes[]>([]);
    const {searchItem} = useSearchStore();

    const fetchSearchedBlogs = async () => {
        try {
            setIsLoading(true);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            await APIMethods.blog.getBlogsByTag(searchItem).then((res:{data:{blogs:any}}) => {
                const blogsRes = res.data.blogs as blogTypes[];
                setBlogs(blogsRes);
                console.log("searched blogs",blogsRes);
            });

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchSearchedBlogs().then(() => {
            console.log("fetching done");
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            console.log("finally",blogs);
            setIsLoading(false);
        }
        );
    }, [searchItem])

    useEffect(() => {
        if(!blogs || blogs.length === 0) {
            return;
        }
        else
        {
            setIsLoading(false);
        }
    }, [blogs])

  return (
    <Stack paddingTop={5} width={'100%'} padding={5}>
      {
        isLoading ? <Stack justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100%'} border={2} flexGrow={1}>
            <CircularProgress />
        </Stack>
         :
          <Stack>
              {blogs.length!=0 && blogs.map((blog, index) => (
              <Blog
                key={index}
                blogId={blog._id}
                author={blog.authorName}
                date={blog.date}
                title={blog.title}
                tags={blog.tags}
                image={blog.coverImageURL}
                likes={blog.likes}
              />
            ))}
          </Stack>
      }
      {
            !isLoading && blogs.length === 0 && <Typography variant='h5'>No blogs found</Typography>
      }
    </Stack>
  )
}
