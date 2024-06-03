"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const ORM_1 = require("../ORM");
const userPostEntity_1 = require("../ORM/entity/userPostEntity");
const userInfoEntity_1 = require("../ORM/entity/userInfoEntity");
const userCommentsEntity_1 = require("../ORM/entity/userCommentsEntity");
const userLikeEntity_1 = require("../ORM/entity/userLikeEntity");
const jwt_1 = require("./jwt");
const router = express_1.default.Router();
//* req.query 로직 처리 함수
const helperParmas = (query) => {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 8) || 8;
    const offset = (page - 1) * limit; //* 지점, page가 2,limit이
    return { page, limit, offset };
};
//* 유저가 쓴 글을 불러오는 함수
const getmyWirte = async (req, res) => {
    const { loginType, userEmail, identifier } = req.user;
    const { page, limit, offset } = helperParmas(req.query);
    try {
        const userInfo = ORM_1.ormConnection.getRepository(userInfoEntity_1.userInfoData);
        const userExsist = await userInfo.findOne({
            where: loginType === "nonSocial"
                ? { userId: identifier, useremail: userEmail }
                : { username: identifier, useremail: userEmail },
        });
        if (!userExsist) {
            return res
                .status(404)
                .json({ message: "아무런 게시글도 존재하지 않습니다." });
        }
        const postRepository = ORM_1.ormConnection.getRepository(userPostEntity_1.userPost);
        // const whereCondition =loginType==="nonSocial"?{userId:identifier}:{username:identifier}
        const [posts, total] = await postRepository.findAndCount({
            where: { socialUser: userExsist },
            skip: offset,
            take: limit,
        });
        if (!posts || posts.length === 0) {
            return res
                .status(404)
                .json({ messgae: "아무런 게시글도 존재하지않습니다." });
        }
        return res.status(200).json({ posts, total });
    }
    catch (error) {
        console.error(error, "유저 게시물 fetch 에러입니다. 코드를 확인하세요");
        return res
            .status(500)
            .json({ message: "글쓰기 데이터 불러오기 에러입니다." });
    }
};
//* 내가 쓴 댓글 가져오는 함수입니다.
//* 내가 쓴 댓글을 가져오면서, 쓴 게시글의 렌더링 img 도 같이 보낸다.
const getMyCommnets = async (req, res) => {
    const { identifier, userEmail, loginType } = req.user;
    const { page, limit, offset } = helperParmas(req.query);
    try {
        const userinfo = ORM_1.ormConnection.getRepository(userCommentsEntity_1.userComment);
        const whereCondition = loginType === "nonSocial"
            ? { userId: identifier }
            : { username: identifier };
        const [commnets, total] = await userinfo.findAndCount({
            where: whereCondition, // 어떤 넘거를
            select: ["userNickName", "text", "postuuid", "commentid"], //뭐를
            skip: offset, //* 건너뛸거 skip 10은 10개 건너뛴다
            take: limit, //* limit이 10개면 10개 가져오겠다.
        });
        if (!commnets || commnets.length === 0) {
            return res.status(404).json({ message: "댓글이 없습니다." });
        }
        console.log(total, commnets);
        return res.status(200).json({ total, commnets });
    }
    catch (error) {
        console.error(error, "댓글 로직에 문제가 있습니다.");
        return res.status(500).json({ message: "댓글 로직이 작동하지 않습니다." });
    }
};
//* 좋아요 한거 가져오는 함수
const getMyLikes = async (req, res) => {
    try {
        const { identifier, userEmail, loginType } = req.user;
        const { page, limit, offset } = helperParmas(req.query);
        const userLikes = ORM_1.ormConnection.getRepository(userLikeEntity_1.userLike);
        const whereCondition = loginType === "nonSocial"
            ? { userId: identifier }
            : { username: identifier };
        const [likes, total] = await userLikes.findAndCount({
            where: whereCondition,
            relations: ["post"],
            skip: offset,
            take: limit,
        });
        if (!likes || likes.length === 0) {
            return res
                .status(404)
                .json({ messgae: "어떠한 좋아요도 하지 않으셨습니다." });
        }
        return res.status(200).json({ likes, total });
    }
    catch (error) {
        console.error(error, "좋아요 불러오는데 에러가 발생");
        return res.status(500).json({ message: "좋아요 가 없어요" });
    }
};
//* api.users 쿼리스트링 처리
router.get("/api/users", jwt_1.verifyToken, async (req, res) => {
    const { selected } = req.query;
    switch (selected) {
        case "myWrite":
            await getmyWirte(req, res);
            break;
        case "myComments":
            await getMyCommnets(req, res);
            break;
        case "myLikes":
            await getMyLikes(req, res);
            break;
        default:
            res.status(400).json({ message: "어떠한 쿼리도 존재하지 않습니다." });
    }
});
exports.default = router;
// *!
// 예시
// 예를 들어, 페이지 번호가 2이고, 한 페이지당 10개의 항목을 보여준다고 가정하자.
// page: 2
// limit: 10
// offset 계산
// offset = (page - 1) * limit
// offset = (2 - 1) * 10
// offset = 1 * 10
// offset = 10
// 따라서, 두 번째 페이지의 데이터를 가져오기 위해 처음 10개의 항목을 건너뛰고, 그 다음 10개의 항목을 가져오게 된다.
//# sourceMappingURL=myPage.js.map