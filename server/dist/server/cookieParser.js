"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const router = (0, express_1.default)();
router.get("/auth/cookie", async (req, res) => {
    const token = req.cookies.token; //* 쿠키에서 토큰 읽기
    console.log(token);
    try {
        if (!token) {
            console.log("token이 존재하지 않습니다.");
            return res.status(404).json({
                message: "404,전역으로 선언할 토큰을 가져오는데 실패했습니다.",
            });
        }
        return res.status(200).json({ token });
    }
    catch (error) {
        console.error(error, "auth/cookie 라우터에 에러가 발생했습니다, 확인하세요");
        return res
            .status(500)
            .json({ message: "auth/cookie 라우터 에러 발생했습니다." });
    }
});
exports.default = router;
//# sourceMappingURL=cookieParser.js.map