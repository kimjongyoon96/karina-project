"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
const axios_1 = __importDefault(require("axios"));
// 사용자 정보를 가져오는 함수를 별도로 정의
async function getUserInfo(accessToken) {
    const url = "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses";
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Failed to fetch user info:", error);
        throw error;
    }
}
exports.getUserInfo = getUserInfo;
exports.default = getUserInfo;
