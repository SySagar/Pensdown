import { create } from 'zustand'

interface SearchStoreState {
  searchItem: string;
}

interface SearchStoreActions {
  setSearch: (search: string) => void;
}

const useSearchStore = create<SearchStoreState & SearchStoreActions>((set) => ({
  searchItem: "",
  setSearch: (search:string) => {set({ searchItem: search})},
}))

export default useSearchStore;