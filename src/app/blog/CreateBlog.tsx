import { IconButton, Stack, TextField, Typography } from "@mui/material";
import Tiptap from "./components/Tiptap";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useEditorContent from "../../lib/store/useEditorContent";

export default function CreateBlog() {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const [setBlog] = useEditorContent((state: any) => [state.setBlog,]);

  return (
    <Stack
      minHeight={"100vh"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      position={"relative"}
      gap={5}
      paddingBottom={5}
    >
      <Typography variant="h2" sx={{ opacity: "0.5" }}>
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
          variant="standard"
          sx={{
            background: "#F4F4F4",
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
          <IconButton
          component="label">
            <input
            hidden
              type="file"
              accept=".jpg,.png,.jpeg"
              onChange={(e) => {
                const selectedFile = e.target.files && e.target.files[0]; // Check if files is not null
                if (selectedFile) {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                  setBlog(
                    {
                      coverImage: selectedFile,
                    }
                    )
                }
              }}
            />
            <AddPhotoAlternateIcon />
            Add a cover image
          </IconButton>
        </Stack>
      </Stack>
      <Stack className="editor">
        <Tiptap />
      </Stack>
    </Stack>
  );
}
