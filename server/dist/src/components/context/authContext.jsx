// import React, { createContext, useState, useContext, ReactNode } from "react";
// import { AuthContextType } from "../../types/contentType";
// //* AuthContext를 생성합니다. 이 컨텍스트는 AuthContextType 또는 undefined 타입의 값을 가질 수 있으며, 초기값은 undefined입니다.
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// //* AuthProvider 컴포넌트를 정의합니다. 이 컴포넌트는 React의 함수형 컴포넌트로, children prop을 받습니다.
// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [jwtToken, setJwtToken] = useState<string | null>(null);
//   const value = { jwtToken, setJwtToken };
//   //* AuthContext.Provider 컴포넌트를 사용하여 children을 래핑하고, 위에서 정의한 value를 context 값으로 제공합니다.
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
// //* useAuth 커스텀 훅을 정의합니다. 이 훅을 사용하여 컴포넌트에서 AuthContext의 값을 쉽게 접근할 수 있습니다.
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   console.log("check_here");
//   console.log(context, "여기를 확인하쎄요!");
//   //* 만약 context가 undefined일 경우, 즉 useAuth 훅이 AuthProvider 내부에서 사용되지 않았을 경우 에러를 발생시킵니다.
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
//# sourceMappingURL=authContext.jsx.map