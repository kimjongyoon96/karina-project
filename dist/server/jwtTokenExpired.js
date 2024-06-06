"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("./jwt");
const router = express_1.default.Router();
router.post("/auth/jwtTokenExpired", jwt_1.verifyToken, async (req, res) => {
    const { userinfo } = req.user;
    try {
        if (!userinfo) {
            return res.status(404).json({ message: "jwt 토큰 없음" });
        }
        return res.status(200).json({ message: "받음" });
    }
    catch (error) {
        return res.status(500).json({ message: "토큰 만료 라우터 에러" });
    }
});
exports.default = router;
