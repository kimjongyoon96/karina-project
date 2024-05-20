import React, { useState, useEffect } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import "./updateprofile.css";
const UpdateProfile: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {
        console.error("내 정보 불러오는데 실패");
      }
    };
  });

  return <div>내정보수정 컴포넌트입니다.</div>;
};

export default UpdateProfile;
