import { create } from 'zustand'

interface LoadingStoreState {
  isLoading: boolean;
}

interface LoadingStoreActions {
  setIsLoading: (status: boolean) => void;
}

const useLoadingStore = create<LoadingStoreState & LoadingStoreActions>((set) => ({
  isLoading: false,
  setIsLoading: (status:boolean) => {set({ isLoading:status})},
}))

export default useLoadingStore;