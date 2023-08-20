import { create } from 'zustand'

const useWriterAction = create((set) => ({
  isWriting: (  localStorage.getItem('isWriting') === 'true' ? true : false) || false,
  setWriting: () => {set({ isWriting:true});localStorage.setItem('isWriting', 'true') },
  setNotWriting: () => {set({ isWriting:false});localStorage.setItem('isWriting', 'false') },
}))

export default useWriterAction;