import { create } from "zustand";
import { justAndTokenExpired } from "../types/justAndExporedToken";
//* Zustand store 생성

const useAuthStore = create<justAndTokenExpired>((set) => ({
  jwtExpired: null,
  setJwtExpired: (isExpired) => set({ jwtExpired: isExpired }),
}));
export default useAuthStore;
