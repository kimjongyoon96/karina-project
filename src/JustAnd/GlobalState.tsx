import { create } from "zustand";
import { AuthStated } from "../types/justAndExporedToken";
//* Zustand store 생성

// const useAuthStore = create<AuthState>((set) => ({
//   a: "forJwtExpired",
//   jwtExpired: null,
//   setJwtExpired: (isExpired) => set({ jwtExpired: isExpired }),
//   b: "forCollabo",
//   iscollabo: "",
//   setIsCollabo: (collabo: string) => set({ iscollabo: collabo }),
// }));
// export default useAuthStore;

const useAuthStore = create<AuthStated>((set) => ({
  jwtExpired: {
    jwtExpiredThing: null,
    setJwtExpiredThing: (isExpired) =>
      set((state) => ({
        jwtExpired: {
          ...state.jwtExpired,
          jwtExpiredThing: isExpired,
        },
      })),
  },
  isCollabo: {
    collaboClick: "",
    setCollaboClick: (collabo) =>
      set((state) => ({
        isCollabo: {
          ...state.isCollabo,
          collaboClick: collabo,
        },
      })),
  },
  collaboResultData: {
    collaboResult: "",
    setCollaboResult: (result) =>
      set((state) => ({
        collaboResultData: {
          ...state.collaboResultData,
          collaboResult: result,
        },
      })),
  },
  alertState: {
    alertMessage: "",
    showAlert: false,
    setAllertMessage: (result) =>
      set((state) => ({
        alertState: {
          ...state.alertState,
          alertMessage: result,
          showAlert: true,
        },
      })),
    hideAlert: () =>
      set((state) => ({
        alertState: {
          ...state.alertState,
          showAlert: false,
        },
      })),
  },
  nonSocialUserEmail: {
    nonSocialEmail: "",
    setNonSocialEmail: (result) =>
      set((state) => ({
        nonSocialUserEmail: {
          ...state.nonSocialUserEmail,
          nonSocialEmail: result,
        },
      })),
  },
}));

export default useAuthStore;
