import { create } from 'zustand'

const useLoadingStore = create((set) => ({
  isLoading: false,
  setIsLoading: (status:boolean) => {set({ isLoading:status})},
}))

export default useLoadingStore;