// //* 쥬스탄드 상태 타입 설정

export interface AuthStated {
  jwtExpired: {
    jwtExpiredThing: boolean | null; // jwtExpired , 상태에 해당
    setJwtExpiredThing: (ieExpired: boolean) => void; // setJwtExpired 상태변경함수에 해당
  };
  isCollabo: {
    collaboClick: string;
    setCollaboClick: (collabo: string) => void;
  };
  collaboResultData: {
    collaboResult: string;
    setCollaboResult: (result: string) => void;
  };
  //* 알러트 상태 함수, 추후 로직으로 활용할 예정이다.
  alertState: {
    alertMessage: string;
    setAllertMessage: (result: string) => void;
    showAlert: boolean;
    showAlertMessage: () => void;
    hideAlert: () => void;
    confirmAction?: () => void;
    setConfirmAction: (action: () => void) => void;
  };
  jwtGlobal: {
    jwtDecodingData: string | null | object;
    setJwtDecodingData: (jwtData: string | null | object) => void;
  };

  mainContentsGlobal: {
    mainContentsData: Array<any>;
    setMainContentsData: (mainData: Array<any>) => void;
  };

  researchInputGlobal: {
    researchInputData: string;
    setReserchInputData: (inputData) => void;
  };
  mainMountRenderData: {
    mainMountData: Array<any>;
    setMainMountData: (mountData: Array<any>) => void;
  };

  pagiNationMenubar: {
    numberData: number | string | null | undefined;
    setNumberData: (number: number | string | undefined) => void;
  };
  UserDeleteRight: {
    deleteBollean: boolean;
    setDeleteBollean: (bool: boolean) => void;
  };
  userInfoName: {
    userRenderName: string;
    setUserRenderName: (name: string) => void;
  };
}
