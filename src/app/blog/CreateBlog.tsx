import { Stack, Typography} from "@mui/material";
import Tiptap from "./components/Tiptap";

export default function createBlog() {
  return (
    <Stack minHeight={'100vh'} alignItems={'center'} gap={5} paddingBottom={5}>
      <Typography variant="h2" sx={{opacity:'0.5'}}>Create your blog here...</Typography>
      <Stack className="editor">
        <Tiptap />
      </Stack>
    </Stack>
  )
}
