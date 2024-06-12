//* 비밀번호 유효성 검사

const vaildUserPw = (userPw) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(userPw);
};

export default vaildUserPw;
