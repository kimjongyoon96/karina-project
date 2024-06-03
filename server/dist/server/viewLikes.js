"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("./jwt");
const ORM_1 = __importDefault(require("../ORM"));
const userLikeEntity_1 = require("../ORM/entity/userLikeEntity");
const router = express_1.default.Router();
//* 모듈화 후보 4 -> 좋아요 보기 로직 => ORM 리팩터링
router.get("/api/viewLikes/:postuuid", jwt_1.verifyToken, async (req, res) => {
    try {
        const { postuuid } = req.params;
        console.log(postuuid, "좋아요 갯수의 req.params 로직");
        const { identifier, userEmail, loginType } = req.user;
        //* 전체 좋아요 수
        const totalLikesCount = await ORM_1.default
            .getRepository(userLikeEntity_1.userLike)
            .createQueryBuilder("like")
            .where("like.postid = :postid", { postid: postuuid })
            .getCount();
        // 현재 사용자가 좋아요를 눌렀는지 확인합니다.
        const whereConditon = loginType === "nonSocial"
            ? { userId: identifier, useremail: userEmail }
            : { username: identifier, useremail: userEmail };
        const userLikeCount = await ORM_1.default
            .getRepository(userLikeEntity_1.userLike)
            .createQueryBuilder("like")
            .where("like.postid = :postid AND like.username = :username", {
            postid: postuuid,
            username: whereConditon,
        })
            .getCount();
        res.json({
            userLiked: userLikeCount, // 좋아요 수가 0보다 크면 현재 사용자가 좋아요를 누른 것으로 간주합니다.
        });
    }
    catch (error) {
        console.error(" 좋아요 서버 에러 확인 하라", error);
        return res.status(500).json({ message: "좋아요 에러입니다," });
    }
});
exports.default = router;
//# sourceMappingURL=viewLikes.js.map