/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { EditorContent, useEditor } from "@tiptap/react";
import { Stack } from "@mui/material";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import ImageUploader from "./ImageUpload";
import Highlight from "@tiptap/extension-highlight";
import "../editor.css";
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaUnderline,
  FaFileImage,
  FaCode,
  FaMinus,
} from "react-icons/fa";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";
import useEditorContent from "../../../lib/store/useEditorContent";

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <Stack
      className="menu-bar"
      direction={"row"}
      maxHeight={"400px"}
      id="menu-bar"
      sx={{ position: "relative" }}
    >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <FaUnderline />
      </button>

      <button
        type="button"
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        <FaCode />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <FaListUl />
      </button>
      <button
        onClick={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <FaListOl />
      </button>

      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <FaMinus />
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: "#D3D3D3" }).run()
        }
        className={editor.isActive("highlight") ? "is-active" : "is-inactive"}
      >
        T
      </button>

      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={1}
        sx={{ cursor: "pointer" }}
      >
        <FaFileImage />
        <ImageUploader editor={editor} />
      </Stack>
    </Stack>
  );
};

export default function Tiptap() {
  const [setBlog] = useEditorContent((state: any) => [
    state.setBlog,
  ]);
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      // TextStyle.configure({ types: [ListItem.name] }),
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      Highlight.configure({
        multicolor: true,
      }),
      BulletList.configure({
        itemTypeName: "listItem",
        keepMarks: true,
      }),
      OrderedList.configure({
        itemTypeName: "listItem",
        keepMarks: true,
      }),
      Text,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Image,
      Placeholder.configure({
        placeholder: "What are your thoughts on...",
      }),
    ],
  });

  useEffect(() => {
    const DBUser = JSON.parse(localStorage.getItem("user") as string);
    const timeout = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setBlog({
        title: "title",
        content: localStorage.getItem("rich-editor") as string,
        authorName : DBUser.name,
        email: DBUser.email,
        id: DBUser._id,
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [ editor, setBlog]);

  if (!editor) {
    return null;
  }

  editor.on("update", ({ editor }) => {
    const json = editor.getJSON() || "";
    localStorage.setItem("rich-editor", JSON.stringify(json));
    console.log(json);
  });

  editor.on("create", ({ editor }) => {
    const json = editor.getJSON() || "";
    localStorage.getItem("rich-editor");
    editor.commands.setContent(
      JSON.parse(localStorage.getItem("rich-editor") as string) as string
    );
    console.log(json);
  });

  return (
    <Stack
      className="text-editor"
      gap={3}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ margin: "0" }}
    >
      <Stack className="menubar" sx={{ position: "relative" }}>
        <MenuBar editor={editor} />
      </Stack>

      <EditorContent
        className="editor"
        editor={editor}
        style={{
          overflow: "scroll",
          minHeight: "450px",
        }}
      />
    </Stack>
  );
}
