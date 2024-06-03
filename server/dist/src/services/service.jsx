"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//* 회원가입 정규표현식 함수
const validUserId = (userId) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9_-]{4,19}$/;
    return regex.test(userId);
};
exports.default = validUserId;
//# sourceMappingURL=service.jsx.map