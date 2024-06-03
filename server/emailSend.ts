import nodemailer from "nodemailer";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// 이메일 전송 함수
async function sendEmail({ from, to, subject, text }) {
  const transporter = nodemailer.createTransport({
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
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: error };
  }
}

export default sendEmail;
