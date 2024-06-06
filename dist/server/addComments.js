"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ORM_1 = __importDefault(require("../ORM"));
const jwt_1 = require("./jwt");
const userInfoEntity_1 = require("../ORM/entity/userInfoEntity");
const userCommentsEntity_1 = require("../ORM/entity/userCommentsEntity");
const router = express_1.default.Router();
router.post("/api/addcomment", jwt_1.verifyToken, async (req, res) => {
    try {
        //클라이언트로 부터 text,postuuid 받음
        const { text, postuuid } = req.body;
        //* jwt에서 유저이름 추출
        const { identifier, userEmail, loginType } = req.user;
        //* 유저인포 엔티티에 접근
        const userInfoRepository = ORM_1.default.getRepository(userInfoEntity_1.userInfoData);
        //* jwt에서 추출한 user 이름과 동일한 엔티티가 존재하는지 찾음
        const userInfoDetail = await userInfoRepository.findOne({
            where: loginType === "nonSocial"
                ? { userId: identifier, useremail: userEmail }
                : { username: identifier, useremail: userEmail },
        });
        if (!userInfoDetail) {
            return res.status(404).json({ message: "닉네임이 없습니다." });
        }
        console.log(userInfoDetail.userNickName, "닉네임");
        const UserComment = new userCommentsEntity_1.userComment(); // 엔티티 클래스 선언
        UserComment.text = text;
        UserComment.postuuid = postuuid;
        UserComment.username =
            loginType === "nonSocial"
                ? userInfoDetail.userId
                : userInfoDetail.username;
        UserComment.userNickName = userInfoDetail.userNickName;
        const userPostRepository = ORM_1.default.getRepository(userCommentsEntity_1.userComment);
        await userPostRepository.save(UserComment);
        const userNickName = userInfoDetail?.["userNickName"];
        res.status(200).json({
            message: "댓글 작성이 완료되었습니다.",
            userNickName: userNickName, //* 닉네임을 클라이언트로 보낸다.
        });
    }
    catch (error) {
        console.error("댓글 작성 에러가 발생했습니다.:", error);
        if (!res.headersSent) {
            res.status(500).send("전송 실패");
        }
    }
});
exports.default = router;
