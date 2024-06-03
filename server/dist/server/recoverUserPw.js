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
const userInfoEntity_1 = require("../ORM/entity/userInfoEntity");
const generateRandom_1 = __importDefault(require("../src/services/generateRandom"));
const emailSend_1 = __importDefault(require("./emailSend"));
const router = express_1.default.Router();
router.post("/api/recoverPw", async (req, res) => {
    try {
        console.log(req.body, "클라이언트가 보낸 pw정보");
        //1. 인풋 값 받는다.
        const { inputUserEmail, inputUserId } = req.body;
        const userRepository = ORM_1.ormConnection.getRepository(userInfoEntity_1.userInfoData);
        const existUser = await userRepository.findOne({
            where: {
                userId: inputUserId,
            },
        });
        if (!existUser) {
            res.status(409).json({ message: "pw찾기위한 회원정보 없음" });
        }
        const random = await (0, generateRandom_1.default)();
        const userID = inputUserId;
        req.session.authcode = random;
        req.session.authUserId = userID;
        console.log(req.session.authUserId, "확인");
        const emailResult = await (0, emailSend_1.default)({
            from: `${process.env.GOOGLE_ID}`,
            to: `${inputUserEmail}`,
            subject: "비밀번호 찾기위한 6가지 숫자입니다.",
            text: `인증번호는 ${random} 입니다.`,
        });
        if (emailResult.success) {
            console.log("Notification sent successfully");
            return res.json({ message: "모든 데이터가 성공적입니다.", sucess: true });
        }
        else {
            console.log("Failed to send notification");
            return res
                .status(500)
                .json({ message: "이메일 전송 실패", error: emailResult.error });
        }
    }
    catch (error) {
        console.error(error, "pw 찾기에 대한 에러입니다.");
        return res.status(500).json({ message: "pw 찾기에 대한 경고입니다." });
    }
});
exports.default = router;
//# sourceMappingURL=recoverUserPw.js.map