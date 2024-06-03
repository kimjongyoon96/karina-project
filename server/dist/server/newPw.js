"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const userPwHash_1 = require("../src/services/userPwHash");
const ORM_1 = require("../ORM");
const userInfoEntity_1 = require("../ORM/entity/userInfoEntity");
const router = express_1.default.Router();
router.post("/api/changePw", async (req, res) => {
    try {
        const { usernewPw } = req.body;
        console.log(usernewPw, "클라이언트에서 받음 비밀번호");
        // const userInputId = req.session.authUserId; // 세션에 있는 유저 아이디;
        // console.log(userInputId, "세션에 저장되어있는 아이디");
        // if (!userInputId) {
        //   return res.json({ message: "세션이 만료되었습니다." });
        // }
        const hashPw = await (0, userPwHash_1.hashPassWord)(usernewPw); // 해싱한 새로운 유저 비밀번호
        console.log("test1");
        const userRepository = ORM_1.ormConnection.getRepository(userInfoEntity_1.userInfoData);
        const existUser = await userRepository.findOne({
            where: {
                userId: req.session.authUserId,
            },
        });
        console.log("test2");
        if (!existUser) {
            return res.status(401).json({ message: "사용자가 없습니다!" });
        }
        console.log("test3");
        existUser.userPassWord = hashPw; // 받은 새 비번으로 할당
        await userRepository.save(existUser);
        return res.json({
            message: "업데이트가 정상적으로 되었습니다.",
            success: true,
        });
    }
    catch (error) {
        console.error(error, "새로운 비밀번호 업데이트 에러");
        return res.status(500).json({ message: "비밀번호 업데이트 실패" });
        console.log("test4");
    }
});
exports.default = router;
//# sourceMappingURL=newPw.js.map