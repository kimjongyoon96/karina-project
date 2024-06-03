"use strict";
//* 비밀번호 유효성 검사
Object.defineProperty(exports, "__esModule", { value: true });
const vaildUserPw = (userPw) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(userPw);
};
exports.default = vaildUserPw;
//# sourceMappingURL=vaildws.jsx.map