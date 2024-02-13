import React, { createContext, useState, useContext, ReactNode } from "react";
import { AuthContextType } from "../src/types/contentType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  const value = { jwtToken, setJwtToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
