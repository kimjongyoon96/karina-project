// Cute.tsx
import React, { useState } from "react";

const Cute = () => {
  const [response, setResponse] = useState("");

  const sendPostRequest = async () => {
    try {
      const result = await fetch("http://localhost:3000/cute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Hello from Cute Component!" }),
      });
      const text = await result.text();
      setResponse(text);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Failed to fetch");
    }
  };

  return (
    <div>
      <button onClick={sendPostRequest}>Send POST Request</button>
      <p>Response: {response}</p>
    </div>
  );
};

export default Cute;
