"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const router = express_1.default.Router();
router.post("/api/certifyNumber", (req, res) => {
    try {
        const { inputNumber } = req.body;
        if (inputNumber === req.session.authcode) {
            res.json({ message: "인증에 성공했습니다.", success: true });
        }
        else {
            res.json({ message: "인증에 실패했습니다." });
        }
    }
    catch (error) {
        res.status(401).json({ message: "인증넘버 서버 에러입니다." });
    }
});
exports.default = router;
//# sourceMappingURL=certifyNumber.js.map