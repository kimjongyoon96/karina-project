"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassWord = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassWord = async (password) => {
    const saltRounds = 10;
    const hash = await bcrypt_1.default.hash(password, saltRounds);
    return hash;
};
exports.hashPassWord = hashPassWord;
const verifyPassword = async (password, hash) => {
    const isMatch = await bcrypt_1.default.compare(password, hash);
    return isMatch;
};
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=userPwHash.jsx.map