export interface justAndTokenExpired {
  jwtExpired: boolean | null;
  setJwtExpired: (isExpired: boolean) => void;
}
