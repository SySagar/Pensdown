import { IconButton, Stack, TextField, Typography } from "@mui/material";
import Tiptap from "./components/Tiptap";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useEditorContent from "../../lib/store/useEditorContent";
import TagInput from "./components/TagInput";

interface BlogImageTypes {
  coverImage: File | null | Blob | MediaSource;
}

export default function CreateBlog() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const [blog, setBlog] = useEditorContent((state: any) => [
    state.blog as BlogImageTypes,
    state.setBlog,
  ]);
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setBlog({
      ...blog,
      title: e.target.value,
    });
  };

  return (
    <Stack
      minHeight={"100vh"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      position={"relative"}
      gap={5}
      sx={{
        backgroundColor: "background.main",
      }}
      paddingBottom={5}
    >
      <Typography variant="h2" color={"text.primary"} sx={{ opacity: "0.5" }}>
        Create your blog here...
      </Typography>
      <Stack
        width={"90%"}
        direction={"column"}
        flexGrow={1}
        gap={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <TextField
          id="title"
          label="Title for your blog"
          fullWidth
          onChange={onTitleChange}
          variant="standard"
          sx={{
            borderRadius: "5px",
            padding: "10px",
          }}
        />
        <Stack
          direction={"row"}
          gap={1}
          alignItems={"center"}
          sx={{ cursor: "pointer" }}
        >
          <IconButton component="label">
            <input
              hidden
              type="file"
              accept=".jpg,.png,.jpeg"
              onChange={(e) => {
                const selectedFile = e.target.files && e.target.files[0]; // Check if files is not null
                if (selectedFile) {
                  setBlog({
                    coverImage: selectedFile,
                  });
                }
              }}
            />
            <AddPhotoAlternateIcon />
            Add a cover image
          </IconButton>
        </Stack>
        {blog.coverImage && (
          <img src={URL.createObjectURL(blog.coverImage)} width={"350px"} />
        )}
      </Stack>
      <Stack>
        <TagInput />
      </Stack>
      <Stack className="editor">
        <Tiptap />
      </Stack>
    </Stack>
  );
}
