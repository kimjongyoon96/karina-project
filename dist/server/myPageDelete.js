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
const userInfoEntity_1 = require("../ORM/entity/userInfoEntity");
const userCommentsEntity_1 = require("../ORM/entity/userCommentsEntity");
const jwt_1 = require("./jwt");
const router = express_1.default.Router();
//* 사용자 정보를 받아야 하는가? => yes, 어떤놈거를 지울지 알아야하니까.
//* 그놈이 어떤 타입을 지워야 하는가 => selected를 쿼리에 받아서 임의로 판단.
//* type이 나의댓글이면 A , 나의 게시글이면 B
//* type에 따라서 동적으로 결과를 발현시킨다.
router.delete("/api/deleteMyPage", jwt_1.verifyToken, async (req, res) => {
    const { identifier, userEmail, loginType } = req.user;
    const { selected, infoSelected } = req.query;
    try {
        if (selected === "myWrite") {
            console.log("내게시물삭제");
            const myRepository = ORM_1.default.getRepository(userInfoEntity_1.userInfoData);
            const findMe = await myRepository.findOne({
                where: loginType === "nonSocial"
                    ? { userId: identifier, useremail: userEmail }
                    : { username: identifier, useremail: userEmail },
            });
            if (!findMe) {
                return res
                    .status(404)
                    .json({ message: "게시물 하기 위한 유저 정보가 없습니다." });
            }
            const postRepository = ORM_1.default.getRepository(userPostEntity_1.userPost);
            const findPost = await postRepository.findOne({
                where: { id: infoSelected },
            });
            if (!findPost) {
                return res.status(404).json({ message: "아무런 게시물도 없습니다." });
            }
            await postRepository.remove(findPost); //* 게시물 삭제
            res.status(200).json({ message: "나의 게시물 삭제가 완료되었습니다." });
        }
        else if (selected === "myComments") {
            const myRepository = ORM_1.default.getRepository(userInfoEntity_1.userInfoData);
            const findMe = myRepository.findOne({
                where: loginType === "nonSocial"
                    ? { userId: identifier, useremail: userEmail }
                    : { username: identifier, useremail: userEmail },
            });
            if (!findMe) {
                return res
                    .status(404)
                    .json({ message: "댓글 삭제를 위한 유저가 없습니다." });
            }
            const commnetRepository = ORM_1.default.getRepository(userCommentsEntity_1.userComment);
            const findCommnets = await commnetRepository.findOne({
                where: { commentid: infoSelected },
            });
            if (!findCommnets) {
                return res.status(404).json({ message: "아무런 댓글도 없습니다." });
            }
            await commnetRepository.remove(findCommnets); //* 인덱스에 맞는 댓글 삭제
            console.log("내 댓글을 삭제 큭큭.");
            res.status(200).json({ message: "댓글 삭제가 완료되었습니다." });
        }
        else {
            res.status(400).json({ message: "유효하지 않은 삭제 요청입니다." });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "마이페이지 지우기 서버쪽 에러 발생했습니다." });
    }
});
exports.default = router;
