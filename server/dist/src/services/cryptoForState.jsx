"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const salt = `${process.env.SALT_STRING}`;
const encrypt = (text) => {
    if (!text) {
        return "";
    }
    return crypto_js_1.default.AES.encrypt(text, salt).toString();
};
exports.encrypt = encrypt;
const decrypt = (text) => {
    if (!text) {
        return "";
    }
    try {
        const bytes = crypto_js_1.default.AES.decrypt(text, salt); // 복호화 시도
        return bytes.toString(crypto_js_1.default.enc.Utf8);
    }
    catch (error) {
        console.error("Decryption error:", error); // 에러 로깅
        return ""; // 에러 발생 시 빈 문자열 반환
    }
};
exports.decrypt = decrypt;
//# sourceMappingURL=cryptoForState.jsx.map