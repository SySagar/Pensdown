import { create } from "zustand";

interface Step {
  label: string;
  isComplete: boolean;
}

interface User {
  email: string;
  password: string;
}

interface Profile {
  name: string;
  username: string;
  bio: string;
}

interface RegisterStore {
  activeStep: number;
  setActiveStep: (by: number) => void;
  steps: Step[];
  user: User | undefined;
  profile: Profile;
  setUser: (u: User) => void;
  setProfile: (p: Profile) => void;
}

const steps: Step[] = [
  {
    label: "Create account",
    isComplete: false,
  },
  {
    label: "Complete your profile",
    isComplete: false,
  }
];
const useRegisterStore = create<RegisterStore>()((set, get) => ({
  activeStep: 0,
  setActiveStep: (idx) => {
    if (get().activeStep === 0 && idx === -1) return;
    if (get().activeStep === steps.length - 1 && idx === 1) return;
    set((state) => ({ activeStep: state.activeStep + idx }));
  },
  steps: steps,
  user: {
    email: "",
    password: "",
  },
  profile: {
    name: "",
    username: "",
    bio: "",
  },
  setUser: (u) => set({ user: u }),
  setProfile: (p) => set({ profile: p }),
}));

export default useRegisterStore;
