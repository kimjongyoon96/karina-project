"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};
exports.default = validateEmail;
// console.log(verifySixNumber, sixNumber, "라우터가 준 6자리 숫자");
// const navigate = useNavigate();
// useEffect(() => {
//   if (showVerification && timeLeft > 0) {
//     const timer = setTimeout(() => {
//       setTimeLeft(timeLeft - 1);
//     }, 1000);
//     return () => clearTimeout(timer);
//   } else if (timeLeft === 0) {
//     setIsBlocked(true);
//   }
// }, [showVerification, timeLeft]);
// //* 인풋태그 값 서버 이메일 요청
// const handleSendEmail = (e) => {
//   const value = e.target.value;
//   setInputEmail(value);
//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/emailForAuth`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `${jwtDecodingData?.["token"]}`,
//           },
//           body: JSON.stringify({
//             inputEmail: inputEmail,
//           }),
//         }
//       );
//       const data = await response.json();
//       if (!response.ok) {
//         return console.error(
//           "Error:",
//           "응답이 실패했습니다.",
//           response.status
//         );
//       }
//       setVerifySixNumber(data); //* 서버에서 클라이언트로 준 Data 즉 이메일값
//       setShowVerification(true);
//       setTimeLeft(180);
//       setIsBlocked(false);
//     } catch (error) {
//       console.error("에러가낫따", error);
//     }
//   };
//   fetchData();
// };
// const handleVerifyEmailResult = (e) => {
//   const value = e.target.value;
//   setSixnumber(value);
//   if (verifySixNumber === sixNumber) {
//     //* 여기까지 왔다면 검증되었다고 판단
//     navigate("/userInfoUpdate");
//   } else {
//     console.error("인증번호가 일치하지 않습니다.");
//   }
// };
// return (
//   <main className="update-my-profile-box">
//     <div className="update-box">
//       <h1>비밀번호를 입력하세요</h1>
//       <input
//         className="update-password-sector"
//         type="email"
//         value={inputEmail}
//         placeholder="이메일을 입력하세요"
//         onChange={(e) => setInputEmail(e.target.value)}
//       />
//       <button onClick={handleSendEmail}>입력</button>
//       {showVerification && !isBlocked && (
//         <div>
//           <input
//             value={sixNumber}
//             type="number"
//             placeholder="이메일로 받은 인증번호를 입력하세요"
//             onChange={(e) => setSixnumber(e.target.value)}
//             disabled={isBlocked}
//           />
//           <button onClick={handleVerifyEmailResult} disabled={isBlocked}>
//             입력
//           </button>
//           <p>
//             남은 시간: {Math.floor(timeLeft / 60)}분 {timeLeft % 60}초
//           </p>
//         </div>
//       )}
//       {isBlocked && (
//         <p>시간 초과로 입력이 차단되었습니다. 다시 시도해 주세요.</p>
//       )}
//     </div>
//   </main>
// );
// };
//# sourceMappingURL=validEmail.jsx.map