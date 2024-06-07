"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../jwt");
const router = express_1.default.Router();
router.get("/api/usersData", jwt_1.verifyToken, async (req, res) => {
    const { identifier, userEmail, loginType } = req.user;
    console.log(identifier, userEmail, loginType, "유저정보를 반환하는 req의값입니다.");
    const userInfo = {
        identifier,
        userEmail,
        loginType,
    };
    try {
        if (identifier && userEmail && loginType) {
            res.status(200).json(userInfo);
        }
        else {
            res.status(404).json({ message: "jwt를 해독할수 없습니다.." });
        }
    }
    catch (error) {
        res.status(500).json({ message: "jwt 정보를 반환할수 없습니다." });
    }
});
exports.default = router;
