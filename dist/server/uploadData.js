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
const userPostEntity_1 = require("../ORM/entity/userPostEntity");
const router = (0, express_1.default)();
router.get("/api/karina", async (req, res) => {
    try {
        // 요청에서 쿼리스트링 파라미터를 추출
        const { menubar, page, limit } = req.query;
        console.log(menubar, page);
        // TypeORM에서 사용할 쿼리 조건 객체
        const whereConditions = {};
        if (menubar) {
            whereConditions["menubar"] = menubar;
        }
        // 페이징 처리를 위한 옵션
        const take = limit ? parseInt(limit, 10) : 10;
        const skip = page ? (parseInt(page, 10) - 1) * take : 0;
        // TypeORM을 사용하여 데이터 조회
        const userPostRepository = ORM_1.default.getRepository(userPostEntity_1.userPost);
        const posts = await userPostRepository.find({
            where: whereConditions,
            take,
            skip,
        });
        // const posts = await userPostRepository
        //   .createQueryBuilder("post")
        //   .leftJoinAndSelect("post.socialUser", "socialUser")
        //   .leftJoinAndSelect("post.comments", "comments")
        //   .loadRelationCountAndMap("post.likeCount", "post.like")
        //   .where(whereConditions)
        //   .take(take)
        //   .skip(skip)
        //   .getMany();
        console.log("쿼리빌더 적용 데이터", posts);
        return res.status(200).json(posts);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("게시물을 가져오는데 실패했습니다.");
    }
});
exports.default = router;
