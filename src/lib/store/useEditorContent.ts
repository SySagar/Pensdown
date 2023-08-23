import { create } from 'zustand'

interface blogTypes {
    title: string;
    body: string;
    authorName: string;
    email: string;
    id: string;
    coverImage: string;
}

const useEditorContent = create((set) => ({
  blog: {
    title: '',
    body: '',
    authorName: '',
    email: '',
    id: '',
    coverImage: '',
  },
 
  setBlog: (blog:blogTypes) => set({ blog: blog }),
}))

export default useEditorContent;