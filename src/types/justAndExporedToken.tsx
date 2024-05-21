// //* 쥬스탄드 상태 타입 설정
// export interface justAndTokenExpired {
//   a: "forJwtExpired";
//   jwtExpired: boolean | null;
//   setJwtExpired: (isExpired: boolean) => void;
// }

// export interface justAndIscollabo {
//   b: "forCollabo";
//   iscollabo: string;
//   setIsCollabo: (collabo: string) => void;
// }
// export interface AuthState extends justAndTokenExpired, justAndIscollabo {}

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
    hideAlert: () => void;
  };
  jwtGlobal: {
    jwtDecodingData: string | null | object;
    setJwtDecodingData: (jwtData: string | null | object) => void;
  };
}
