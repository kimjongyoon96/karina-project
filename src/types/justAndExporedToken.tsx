//* 쥬스탄드 상태 타입 설정
export interface justAndTokenExpired {
  jwtExpired: boolean | null;
  setJwtExpired: (isExpired: boolean) => void;
}
