//* 쥬스탄드 상태 타입 설정
export interface justAndTokenExpired {
  a: "forJwtExpired";
  jwtExpired: boolean | null;
  setJwtExpired: (isExpired: boolean) => void;
}

export interface justAndIscollabo {
  b: "forCollabo";
  iscollabo: string;
  setIsCollabo: (collabo: string) => void;
}
export interface AuthState extends justAndTokenExpired, justAndIscollabo {}
