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
const userInfoEntity_1 = require("../ORM/entity/userInfoEntity");
const jwt_1 = require("./jwt");
const router = (0, express_1.default)();
//* 소셜 로그인시 닉네임 받는 라우터
router.post("/api/addNickName", jwt_1.verifyToken, async (req, res) => {
    try {
        const { nickName } = req.body; //* 닉네임 클라이언트 인풋태그
        const { userEmail, identifier, loginType } = req.user;
        if (!nickName || !identifier) {
            return res
                .status(400)
                .json({ message: "닉네임과 유저인포가 존재하지 않습니다." });
        }
        //* 유저인포 데이타를 불러옴니다
        const userentity = await ORM_1.default.getRepository(userInfoEntity_1.userInfoData);
        const User = await userentity.findOne({
            where: loginType === "nonSocial"
                ? { userId: identifier, useremail: userEmail }
                : { username: identifier, useremail: userEmail },
        });
        //* 유저가 있다면, 닉네임컬럼에 닉네임을 저장합니다.
        if (User) {
            User.userNickName = nickName;
            await userentity.save(User);
            return res
                .status(200)
                .json({ message: "닉네임이 성공적으로 추가되었습니다." });
        }
    }
    catch (error) {
        console.error(error, "닉네임 post 서버쪽 에러입니다.");
        res.status(500).json({ message: "닉네임 서버 에러 발생" });
    }
});
exports.default = router;
