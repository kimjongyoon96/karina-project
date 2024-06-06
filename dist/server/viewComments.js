"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userCommentsEntity_1 = require("../ORM/entity/userCommentsEntity");
const ORM_1 = __importDefault(require("../ORM"));
const router = express_1.default.Router();
router.get("/api/viewComments/:postuuid", async (req, res) => {
    try {
        const { postuuid } = req.params;
        console.log(postuuid, "파라미터에서 추출한 UUID");
        const comments = await ORM_1.default.getRepository(userCommentsEntity_1.userComment).find({
            where: { postuuid: postuuid },
            select: ["userNickName", "text"],
        });
        res.status(200).json(comments);
    }
    catch (error) {
        console.error("댓글 불러오는데 에러났다", error);
        res.status(500).json({ message: "댓글을 불러올수 없습니다." });
    }
});
exports.default = router;
