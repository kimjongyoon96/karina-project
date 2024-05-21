import { create } from "zustand";
import { AuthStated } from "../types/justAndExporedToken";
//* Zustand store 생성

const useAuthStore = create<AuthStated>((set) => ({
  //* jwt 토큰 만료 판단 전역상태
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
  //* 콜라보 결과물 전역상태
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
  //* 알림 컴포넌트 전역상태
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

  jwtGlobal: {
    jwtDecodingData: null,
    setJwtDecodingData: (jwtData) =>
      set((state) => ({
        jwtGlobal: {
          ...state.jwtGlobal,
          jwtDecodingData: jwtData,
        },
      })),
  },
}));

export default useAuthStore;
