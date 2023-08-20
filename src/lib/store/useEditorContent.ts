import { create } from 'zustand'

interface blogTypes {
    title: string;
    body: string;
    authorName: string;
}

const useEditorContent = create((set) => ({
  blog: {
    title: '',
    body: '',
    authorName: '',
    email: '',
    id: '',
  },
 
  setBlog: (blog:blogTypes) => set({ blog: blog }),
}))

export default useEditorContent;