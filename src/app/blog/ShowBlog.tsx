import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import APIMethods from "../../lib/axios/api";
import { useState } from "react";
import {Editor} from '@tiptap/react'
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

export default function ShowBlog() {
    const {blogId} = useParams() as {blogId: string};
    const [blog, setBlog] = useState();

    const fetchBlog = async () => {
        await APIMethods.blog.getSingleBlog(blogId).then((res:any) => {
            console.log(res);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            setBlog(res.data.blog);
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
      alignItems={"start"}
      padding={5}
    >
      <Stack direction={'column'} gap={1}>
        <Typography variant="body2">author</Typography>
      </Stack>

      <Stack>

      </Stack>
    </Stack>
  );
}