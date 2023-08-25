import { Avatar, Divider, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import APIMethods from "../../lib/axios/api";
import { useState } from "react";
import {Editor, EditorContent} from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {Heading} from "@tiptap/extension-heading";
import  BulletList  from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Document from "@tiptap/extension-document";
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Highlight from "@tiptap/extension-highlight";
import { SingleBlogTypes } from "./types/blogTypes";
import useLoadingStore from "../../lib/store/useLoading";
import './preview.css'

export default function ShowBlog() {
    const {blogId} = useParams() as {blogId: string};
    const [blog, setBlog] = useState();
    const [author,setAuthor] = useState('');
    const [date,setDate] = useState('');
    const [title,setTitle] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [isLoading,setIsLoading] = useLoadingStore((state: any) => [
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        state.loading,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        state.setIsLoading,
      ]);

    const fetchBlog = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setIsLoading(true);
        await APIMethods.blog.getSingleBlog({blogId}).then((res:SingleBlogTypes) => {
            console.log(res);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setBlog(JSON.parse(res.data.blogs.content));
             setAuthor(res.data.blogs.authorName);
           setDate(res.data.blogs.date);
            setTitle(res.data.blogs.title);
        }
        ).catch((e) => {
            console.log(e);
        }
        )
    }

    useEffect(() => {
        fetchBlog().then((res) => {
            console.log(res);
        }
        ).catch((e) => {
            console.log(e);
        }
        )
    }, [blogId]);

    useEffect(() => {

      if(blog !=null && author !== '' && date !== '' && title !== ''){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setIsLoading(false);
      }

    }, [blog,author,date,title]);

    const previewEditor = new Editor({
        content: blog,
        extensions: [
          Color.configure({ types: [TextStyle.name, ListItem.name] }),
          StarterKit.configure({
            bulletList: {
              keepMarks: true,
              keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
            orderedList: {
              keepMarks: true,
              keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
          }),
          Underline,
          Document,
          Paragraph,
          Highlight.configure({
            multicolor: true
          }),
          BulletList.configure({
            itemTypeName: 'listItem',
            keepMarks: true,
          }),
          OrderedList.configure({
            itemTypeName: 'listItem',
            keepMarks: true,
          }),
          Text,
          Heading.configure({
            levels: [1, 2, 3, 4, 5, 6],
          }),
          Image,
        ]
      });
      previewEditor.setEditable(false)

  return (
    <Stack
      minHeight={"100vh"}
      justifyContent={"start"}
      alignItems={"center"}
      padding={5}
    >
      <Stack width={'900px'} justifyContent={'center'} alignItems={'start'} gap={2}>

      <Stack direction={'column'} gap={1} justifyContent={'center'} alignItems={'center'} width={'100%'}>
        <Typography variant="h3">{title}</Typography>
      </Stack>

      <Stack direction={'row'} gap={1} alignItems={'center'} >
                <Avatar
          src={
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
          }
          alt={"name"}
        />
        <Typography>
          {author} · {date}
        </Typography>
        </Stack>

      <Stack>

          <Divider />
      </Stack>


      <EditorContent
        className="previeweditor"
        editor={previewEditor}
        style={{
          overflow: "scroll",
          minHeight: "450px",
        }}
      />
      </Stack>
    </Stack>
  );
}