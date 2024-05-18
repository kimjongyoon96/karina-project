import { create } from "zustand";
import { justAndTokenExpired } from "../types/justAndExporedToken";
import { AuthState } from "../types/justAndExporedToken";
//* Zustand store 생성

const useAuthStore = create<AuthState>((set) => ({
  a: "forJwtExpired",
  jwtExpired: null,
  setJwtExpired: (isExpired) => set({ jwtExpired: isExpired }),
  b: "forCollabo",
  iscollabo: "",
  setIsCollabo: (collabo: string) => set({ iscollabo: collabo }),
}));
export default useAuthStore;
