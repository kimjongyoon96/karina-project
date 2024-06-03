"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("./jwt");
const ORM_1 = __importDefault(require("../ORM"));
const userInfoEntity_1 = require("../ORM/entity/userInfoEntity");
const userLikeEntity_1 = require("../ORM/entity/userLikeEntity");
const router = express_1.default.Router();
router.post("/api/like", jwt_1.verifyToken, async (req, res) => {
    try {
        const { postuuid } = req.body;
        const { identifier, userEmail, loginType } = req.user;
        console.log(postuuid, "포스트유유아이디");
        console.log(identifier, "좋아요 할때 아이디 혹은 유저이름값");
        const findUserInfo = ORM_1.default.getRepository(userInfoEntity_1.userInfoData);
        const userInfoMatch = await findUserInfo.findOne({
            where: loginType === "nonSocial"
                ? { userId: identifier, useremail: userEmail }
                : { username: identifier, useremail: userEmail },
        });
        if (!userInfoMatch) {
            return res
                .status(404)
                .json({ message: "좋아요를 위한 유저 정보가 존재하지 않습니다." });
        }
        const UserLike = new userLikeEntity_1.userLike();
        UserLike.postid = postuuid;
        if (loginType === "nonSocial") {
            UserLike.userId = identifier; // non소셜 로그인 아이디 문자열
            console.log("nonSocial 로그인:", UserLike.userId);
        }
        else {
            UserLike.username = identifier; // 소셜 로그인
            console.log("socialLogin:", UserLike.username);
        }
        const userPostRepository = ORM_1.default.getRepository(userLikeEntity_1.userLike);
        await userPostRepository.save(UserLike);
        res.status(200).json({ message: "추천이 정상적으로 되었습니다." });
    }
    catch (error) {
        console.error("에러가 발생, 좋아요 로직 이상 서버", error);
        if (!res.headersSent) {
            res.status(500).send("전송 실패");
        }
    }
});
exports.default = router;
//# sourceMappingURL=addLike.js.map