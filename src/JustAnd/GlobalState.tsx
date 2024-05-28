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
  //* 알람 모달 전역 상태, 이거 가져다가 쓰자.
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
    showAlertMessage: () =>
      set((state) => ({
        alertState: {
          ...state.alertState,
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
    setConfirmAction: (action: () => void) =>
      set((state) => ({
        alertState: {
          ...state.alertState,
          confirmAction: action,
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
  mainContentsGlobal: {
    mainContentsData: [],
    setMainContentsData: (mainData) =>
      set((state) => ({
        mainContentsGlobal: {
          ...state.mainContentsGlobal,
          mainContentsData: mainData,
        },
      })),
  },
  mainMountRenderData: {
    mainMountData: [],
    setMainMountData: (mountData) =>
      set((state) => ({
        mainMountRenderData: {
          ...state.mainMountRenderData,
          mainMountData: mountData,
        },
      })),
  },
  researchInputGlobal: {
    researchInputData: "",
    setReserchInputData: (inputData) =>
      set((state) => ({
        researchInputGlobal: {
          ...state.researchInputGlobal,
          researchInputData: inputData,
        },
      })),
  },
}));

export default useAuthStore;
