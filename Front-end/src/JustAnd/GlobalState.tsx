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
  //* jwt 전역 상태
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
  //* 메뉴바에 종속되는 렌더링 데이터 상태
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
  //* 초기 메인 컨텐츠 렌더링 상태
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
  //* 검색 인풋값 전역 상태
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
  pagiNationMenubar: {
    numberData: null,
    setNumberData: (number) =>
      set((state) => ({
        pagiNationMenubar: {
          ...state.pagiNationMenubar,
          numberData: number,
        },
      })),
  },

  UserDeleteRight: {
    deleteBollean: false,
    setDeleteBollean: (bool) =>
      set((state) => ({
        UserDeleteRight: {
          ...state.UserDeleteRight,
          deleteBollean: bool,
        },
      })),
  },
}));

export default useAuthStore;
