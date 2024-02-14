import React, { createContext, useState, useContext, ReactNode } from "react";
import { AuthContextType } from "../src/types/contentType";

// AuthContex 객체 생성 초기값 undefined는 AuthProvider 내부에 모든 컴포넌트가 자식으로 오는것 강조
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// AuthProvider 함수 => 상태과 상태관리함수를 자식 컴포넌트가 쓸수있다.
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const value = { jwtToken, setJwtToken };
  // AuthContex 객체 Provider에 value 전달 즉, 상태전달 모든 컴포넌트가 JWT를 쓸수있음.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// useContext(AuthContext)를 통해 Context의 값을 읽음.
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  console.log("check_here");
  console.log(context);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
