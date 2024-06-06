"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ORM_1 = __importDefault(require("../ORM"));
const oauth_1 = __importDefault(require("./oauth"));
const userInfoEntity_1 = require("../ORM/entity/userInfoEntity");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userinfo_1 = __importDefault(require("./userinfo"));
const secretKey = process.env.JWT_SECRET_KEY;
const router = express_1.default.Router();
// 사용자를 Google 로그인 페이지로 리디렉션하는 경로
const client_id = process.env.CLIENT_ID;
const redirect_uri = `${process.env.REACT_APP_API_URL}/auth/google/redirect`;
const response_type = "code";
const scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
const access_type = "offline";
const prompt = "consent";
if (!client_id ||
    !redirect_uri ||
    !response_type ||
    !scope ||
    !access_type ||
    !prompt) {
    throw new Error("google 로그인 parmas 에서 뭔가 잘못되었어.");
}
router.get("/auth/google", (req, res) => {
    const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = {
        client_id,
        redirect_uri,
        response_type,
        scope,
        access_type,
        prompt,
    };
    const queryString = new URLSearchParams(params).toString();
    const authUrl = `${oauth2Endpoint}?${queryString}`;
    res.redirect(authUrl);
});
// Google로부터 리디렉션된 후 `authorization code`를 받아 처리하는 경로
router.get("/auth/google/redirect", async (req, res) => {
    const { code } = req.query;
    console.log(code, "여기가 코드입니다.");
    try {
        const { access_token, refresh_token } = await (0, oauth_1.default)(code);
        console.log("Access Token:", access_token);
        console.log("Refresh Token:", refresh_token);
        const userInfo = await (0, userinfo_1.default)(access_token);
        console.log(userInfo, "유저인포 나와라!");
        const userName = userInfo.names[0].displayName;
        const userEmail = userInfo.emailAddresses[0].value;
        const loginType = "GOOGLE";
        // 여기까지는 동일한 적용(회원유무 상관없이)0
        // 로그인 하는 인간이 DB에 있는지 확인 로직
        const useregist = await ORM_1.default.getRepository(userInfoEntity_1.userInfoData);
        let user = await useregist.findOne({
            where: { useremail: userEmail, loginType: loginType },
        });
        if (!user) {
            // DB에 사용자가 없으면 새로 추가
            const User = new userInfoEntity_1.userInfoData();
            User.username = userName;
            User.useremail = userEmail;
            User.loginType = loginType;
            await useregist.save(User);
            // 새로 추가된 사용자 정보를 가져옴
            user = await useregist.findOne({
                where: { useremail: userEmail, loginType: loginType },
            });
        }
        // JWT 토큰 생성 => 유저이름, 유저이메일, 유저 로그인타입
        const token = jsonwebtoken_1.default.sign({
            userName: userName,
            userid: undefined,
            userEmail: userEmail,
            loginType: loginType,
        }, secretKey, { expiresIn: "5h" });
        console.log(token, "내가 발행한 유저의 토큰입니다.");
        console.log(user?.userNickName, "유저닉네임이 있는가?");
        if (!user?.userNickName || user.userNickName === "defaultNickName") {
            res.cookie("token", token, { httpOnly: true, secure: false });
            return res.redirect(`${process.env.REACT_APP_API_URL}/addNickName`); //닉네임 없으면 닉네임 추가 컴포넌트로 리다이렉트
        }
        //* 닉네임 있는 경우 바로 토큰 발급
        res.cookie("token", token, { httpOnly: true, secure: false });
        return res.redirect(`${process.env.REACT_APP_API_URL}`); // 클라이언트 페이지로 리디렉션
    }
    catch (error) {
        console.error("Error handling OAuth callback:", error);
        res.status(500).send("구글 로그인 문제가 있습니다");
    }
});
exports.default = router;
