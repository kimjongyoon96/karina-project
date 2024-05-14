import { create } from "zustand";

//* Zustand store 생성

const useAuthStore = create((set) => ({
  jwtExpired: null,
  setJwtExpired: (isExpired) => set({ jwtExpired: isExpired }),
}));
export default useAuthStore;
