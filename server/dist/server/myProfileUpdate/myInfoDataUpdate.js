"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../jwt");
const ORM_1 = __importDefault(require("../../ORM"));
const userInfoEntity_1 = require("../../ORM/entity/userInfoEntity");
const router = express_1.default.Router();
router.post("/api/usersInfo", jwt_1.verifyToken, async (req, res) => {
    const { identifier, userEmail, loginType } = req.user; // jwt 토큰값
    console.log("api/usersInfo의 값:", identifier, userEmail, loginType);
    try {
        const isUserExgist = ORM_1.default.getRepository(userInfoEntity_1.userInfoData);
        if (!isUserExgist) {
            return res
                .status(404)
                .json({ message: "DB에 연결하는데에 실패했습니다." });
        }
        const findUserInfo = await isUserExgist.findOne({
            where: loginType === "nonSocial"
                ? { userId: identifier, useremail: userEmail }
                : { username: identifier, useremail: userEmail },
        });
        if (!findUserInfo) {
            return res
                .status(403)
                .json({ message: "해당 유저를 찾을수가 없습니다." });
        }
        //* 조건에 맞는 데이터를 해당 엔티티에서 추출
        const userResponse = {
            username: findUserInfo.username,
            userId: findUserInfo.userId,
            useremail: findUserInfo.useremail,
            userPassWord: findUserInfo.userPassWord,
            userNickName: findUserInfo.userNickName,
            loginType: findUserInfo.loginType,
        };
        console.log("마이페이지 DB값 정보", userResponse);
        return res.status(200).json(userResponse);
    }
    catch (error) {
        console.error(error, "/api/usersInfo 라우터 에러입니다.");
        return res
            .status(500)
            .json({ message: "내정보 보여주는 라우터 에러가 발생했습니다." });
    }
});
exports.default = router;
//# sourceMappingURL=myInfoDataUpdate.js.map