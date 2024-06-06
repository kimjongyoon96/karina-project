"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
// 이메일 전송 함수
async function sendEmail({ from, to, subject, text }) {
    const transporter = nodemailer_1.default.createTransport({
        service: "Naver",
        host: "smtp.naver.com",
        port: 465,
        secure: false,
        auth: {
            user: `${process.env.GOOGLE_ID}`,
            pass: `${process.env.GOOGLE_PW}`,
        },
    });
    const mailOptions = {
        from,
        to,
        subject,
        text,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return { success: true, messageId: info.messageId };
    }
    catch (error) {
        console.error("Failed to send email:", error);
        return { success: false, error: error };
    }
}
exports.default = sendEmail;
