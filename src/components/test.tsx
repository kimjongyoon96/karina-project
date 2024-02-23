import React, { useState, ChangeEvent } from "react";
import { useAuth } from "./context/authContext";

const SimpleInputComponent: React.FC = () => {
  // useState에 타입을 명시하여 입력값의 상태를 관리합니다.
  const { jwtToken } = useAuth();
  console.log("testtest");
  console.log(jwtToken);
  return <div>test 컴포넌트입니다,</div>;
};

export default SimpleInputComponent;
