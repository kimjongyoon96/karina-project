import CryptoJS from "crypto-js";

const salt = `${process.env.SALT_STRING}`;
export const encrypt = (text) => {
  if (!text) {
    return "";
  }
  return CryptoJS.AES.encrypt(text, salt).toString();
};

export const decrypt = (text) => {
  if (!text) {
    return "";
  }
  try {
    const bytes = CryptoJS.AES.decrypt(text, salt); // 복호화 시도
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error); // 에러 로깅
    return ""; // 에러 발생 시 빈 문자열 반환
  }
};
