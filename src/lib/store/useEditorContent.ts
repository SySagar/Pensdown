import { create } from 'zustand'

interface blogTypes {
    title: string;
    body: string;
    authorName: string;
    email: string;
    id: string;
    coverImage: string;
    tags?: string[];
}

const useEditorContent = create((set) => ({
  blog: {
    title: '',
    body: '',
    authorName: '',
    email: '',
    id: '',
    coverImage: '',
    tags : [],
  },
 
  setBlog: (blog:blogTypes) => set({ blog: blog }),
  resetBlog: () => set({ blog: {
    title: '',
    body: '',
    authorName: '',
    email: '',
    id: '',
    coverImage: '',
    tags : [],
  } }),
}))

export default useEditorContent;