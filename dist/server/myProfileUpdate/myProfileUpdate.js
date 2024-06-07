"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userInfoEntity_1 = require("../..//ORM/entity/userInfoEntity");
const ORM_1 = __importDefault(require("../..//ORM"));
const emailSend_1 = __importDefault(require(".././emailSend"));
const jwt_1 = require("../jwt");
const router = express_1.default.Router();
const randomNumberFunction = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
//* jwt 생성해서, 여기서 검증 다시 한다.
//* status의 number 에 따라서 클라이언트에서 컴포넌트 분배 다시
//* 그리고 수정을 진행 => jwt.sign(0.3h )
//* 서버에서 이메일 인증을 하는것이 아닌, 이메일로 특정 URL을 보내준다.
router.post("/api/emailForAuth", jwt_1.verifyToken, async (req, res) => {
    const { userInputEmail } = req.body;
    console.log(userInputEmail, "이메일전송 값 뭐가나오나");
    const { identifier, userEmail, loginType } = req.user;
    console.log(identifier, userEmail, loginType, "유저정보와 로그인 수단입니다.");
    const randomNumber = randomNumberFunction();
    try {
        const userRepository = ORM_1.default.getRepository(userInfoEntity_1.userInfoData); //* 이메일을 보내기 위해서 유저를 찾습니다.
        const findUser = userRepository.findOne({
            where: loginType === "nonSocial"
                ? { userId: identifier, useremail: userEmail } //* loginType이 논소셜이면 해당 userId와 이메일을 참조하여 인풋값과 비교하여 찾습니다.
                : { username: identifier, useremail: userEmail }, //* 만일 False일 경우, 유저이름과 해당 이메일을 비교하여 유저를 찾습니다.
        });
        if (!findUser) {
            return res
                .status(404)
                .json({ message: "이메일을 찾기 위한 유저정보가 존재하지 않습니다." });
        }
        else {
            const emailResult = await (0, emailSend_1.default)({
                from: `${process.env.GOOGLE_ID}`,
                to: `${userInputEmail}`,
                subject: "마이페이지 접근을 위한 비밀번호입니다.",
                text: `접근하시려면 ${randomNumber} 를 입력하세요`,
            });
            if (emailResult.success) {
                console.log("이메일 전송 성공!");
            }
            else {
                console.log("이메일 전송 실패!", emailResult.error);
            }
        }
        return res.status(200).json(randomNumber); //* 사용자 검증을 위한 6가지 number
    }
    catch (error) {
        res.status(500).json({ message: "api/emailForAuth 에러입니다." });
    }
});
exports.default = router;
// 마이페이지의 내정보수정을 클릭하게되면, 해당컴포넌트가 마운트된다.
// 마운트된 컴포넌트에서, header에 내 token 정보를 담은 jwt 값을 서버로 보낸다.
// 해당 라우터에서, header에 있는 토큰값을 검증한후, 그값을 통해서 디코딩된 유저의 정보를 추출한다.
// 따라서, 이메일이 전송되었다는것은, jwt가 검증되었으며, DB에 요청을 보낸 회원이 있다는 의미이다.
// 그리고 클라이언트에서 이메일로 받은 랜덤넘버, 서버에서 준 랜덤넘버가 일치하면, access를 한다.
// 여기서 문제인데, 이다음 즉, 이 회원정보에 DB의 값을 그대로 렌더링해주면서 수정요청을 할수있는 페이지를 만들어야하는데, 논리적인 흐름으로  마이페이지에 들어왔으며, 내정보수정에 접근하기까지 이미 다 검증이 완료되었다고 생각한다.
// 따라서, 이에 내정보수정 렌더링을 하기위해서, jwtToken을 header에 포함한 요청을 다시 보내서,
// 3중으로 검증된 요청만 렌더링 되게 하려고 하는데, 적절한가?
