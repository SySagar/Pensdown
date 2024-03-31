// TagInput.tsx
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import TAGS from "../../../lib/constants/TAGS";
import { Button, Chip, Stack, Typography } from "@mui/material";
import useEditorContent from "../../../lib/store/useEditorContent";

interface BlogTagTypes {
  tags: string[];
}

const TagInput: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const [blog, setBlog] = useEditorContent((state: any) => [
    state.blog as BlogTagTypes,
    state.setBlog,
  ]);
  // const onTagsChnage = (e: React.ChangeEvent<HTMLInputElement>) => {

  // }

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    value: string | null,
  ) => {
    if (value) {
      setTags([...tags, value]);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setBlog({ ...blog, tags: tags });
  }, [tags]);

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Stack gap={3} justifyContent={"center"} alignItems={"center"}>
      <Typography>Select category/categories</Typography>
      <Stack direction={"row"} gap={1}>
        <Autocomplete
          freeSolo
          sx={{
            width: "400px",
          }}
          options={[...tags, ...TAGS]}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Tags"
              placeholder="Enter tags"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
          )}
          onChange={handleAutocompleteChange}
        />
        <Button
          variant="contained"
          sx={{ color: "white", background: "#474747" }}
          onClick={handleAddTag}
        >
          Add Tag
        </Button>
      </Stack>
      <Stack direction={"row"} width={"500px"} flexWrap={"wrap"} gap={"4px"}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleDeleteTag(tag)}
            sx={{
              background: "#474747",
              color: "white",
              borderRadius: "14px",
              padding: "5px 10px",
              "& .MuiChip-deleteIcon": {
                color: "white", // Change this to the desired color for the delete icon
              },
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default TagInput;
