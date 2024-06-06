"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const emailSend_1 = __importDefault(require("./emailSend"));
const ORM_1 = __importDefault(require("../ORM"));
const userInfoEntity_1 = require("../ORM/entity/userInfoEntity");
const router = express_1.default.Router();
router.post("/api/recoverId", async (req, res) => {
    try {
        console.log(req.body, "클라이언트가 서버로 보낸 회원정보찾기");
        const { inputEmail } = req.body;
        const userRepository = ORM_1.default.getRepository(userInfoEntity_1.userInfoData);
        const existUser = await userRepository.findOne({
            where: {
                useremail: inputEmail,
            },
        });
        if (!existUser) {
            return res.status(409).json({ message: "찾을 ID가 존재하지 않습니다." });
        }
        else {
            const emailResult = await (0, emailSend_1.default)({
                from: `${process.env.GOOGLE_ID}`,
                to: `${inputEmail}`,
                subject: "당신의 아이디를 보내드립니다.",
                text: `귀하의 아이디는 ${existUser.userId} 입니다.`,
            });
            if (emailResult.success) {
                console.log("Notification sent successfully");
            }
            else {
                console.log("Failed to send notification", emailResult.error);
            }
        }
        res.json({ message: "잘받았다." });
    }
    catch (error) {
        console.error(error, "회원정보 찾기 에러입니다.");
        res.status(500).json({ message: "회원정보 찾기에서 에러가 발생했습니다." });
    }
});
exports.default = router;
