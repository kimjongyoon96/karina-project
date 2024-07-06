import React from "react";
import { useState, useEffect } from "react";

const IsClosure: React.FC = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_CLIENT_APP}/callback`
        );
        if (!response.ok) {
          throw new Error("에러발생 비상상태");
        }

        const data = await response.json();
      } catch (error) {
        console.error("에러발생");
      }
    };
  });

  return <div></div>;
};
