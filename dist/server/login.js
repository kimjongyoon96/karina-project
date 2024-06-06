"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const ORM_1 = __importDefault(require("../ORM"));
const userPwHash_1 = require("./service/userPwHash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userInfoEntity_1 = require("../ORM/entity/userInfoEntity");
const router = express_1.default.Router();
const secretKey = process.env.JWT_SECRET_KEY;
router.post("/api/loginCheck", async (req, res) => {
    try {
        console.log(req.body, "로그인 클라이언트에서 보낸 바디");
        const { inputId, inputPw } = req.body;
        const loginType = "nonSocial";
        const userRepository = await ORM_1.default.getRepository(userInfoEntity_1.userInfoData);
        const existUser = await userRepository.findOne({
            where: {
                userId: inputId,
                loginType: loginType,
            },
        });
        if (!existUser) {
            return res.status(409).json({ message: "DB에 회원정보가 없습니다." });
        }
        const isMatch = await (0, userPwHash_1.verifyPassword)(inputPw, existUser.userPassWord);
        if (!isMatch) {
            return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
        }
        //* 여기까지 왔으면, DB에 정보가 있다고 판단, JWT 발급
        // const useremail = req.session.useremail;
        const token = jsonwebtoken_1.default.sign({
            userid: inputId,
            userName: undefined,
            userEmail: existUser.useremail,
            loginType: loginType,
        }, secretKey, {
            expiresIn: "5h",
        });
        console.log(token, "아이디 로직시 토큰");
        res.cookie("token", token, { httpOnly: true, secure: false });
        res.status(200).json({ message: "로그인 성공" });
    }
    catch (error) {
        console.error(error, "로그인 확인 서버쪽 에러가 발생했습니다.");
        res.status(500).json({ message: "로그인 체크에서 에러가 발생했습니다." });
    }
});
exports.default = router;
