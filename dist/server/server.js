"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
// import researchResultRouter from "./researchResultGet";
const register_1 = __importDefault(require("./register"));
const login_1 = __importDefault(require("./login"));
const recoverUserId_1 = __importDefault(require("./recoverUserId"));
const recoverUserPw_1 = __importDefault(require("./recoverUserPw"));
const certifyNumber_1 = __importDefault(require("./certifyNumber"));
const researchResultGet_1 = __importDefault(require("./researchResultGet"));
const newPw_1 = __importDefault(require("./newPw"));
const naverLogin_1 = __importDefault(require("./naverLogin"));
const myPage_1 = __importDefault(require("./myPage"));
const fileUpload_1 = __importDefault(require("./fileUpload"));
const cookieParser_1 = __importDefault(require("./cookieParser"));
const uploadData_1 = __importDefault(require("./uploadData"));
const addNickName_1 = __importDefault(require("./addNickName"));
const myPageDelete_1 = __importDefault(require("./myPageDelete"));
const saju_1 = __importDefault(require("./saju"));
const sajuResult_1 = __importDefault(require("./sajuResult/sajuResult"));
const myProfileUpdate_1 = __importDefault(require("./myProfileUpdate/myProfileUpdate"));
const myProfilejwtVerify_1 = __importDefault(require("./myProfileUpdate/myProfilejwtVerify"));
const myInfoDataUpdate_1 = __importDefault(require("./myProfileUpdate/myInfoDataUpdate"));
const myInfoUpdate_1 = __importDefault(require("./myProfileUpdate/myInfoUpdate"));
const jwtTokenExpired_1 = __importDefault(require("./jwtTokenExpired"));
const addComments_1 = __importDefault(require("./addComments"));
const addLike_1 = __importDefault(require("./addLike"));
const viewComments_1 = __importDefault(require("./viewComments"));
const viewLikes_1 = __importDefault(require("./viewLikes"));
const googleLogin_1 = __importDefault(require("./googleLogin"));
const viewTotalLikes_1 = __importDefault(require("./viewTotalLikes"));
const app = (0, express_1.default)();
//* cors 에러방지 미들웨어
app.use((0, cors_1.default)({
    origin: "http://localhost:3001",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PATCH"],
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "10mb", extended: true }));
const sessionMiddleware = (0, express_session_1.default)({
    secret: `${process.env.SESSION_KEY}`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, //* HTTPS를 사용하지 않는 경우 false로 설정
});
app.use(register_1.default); // 회원가입 라우터
app.use(login_1.default); // 로그인 라우터
app.use(recoverUserId_1.default); // 로그인 찾기 로직
app.use("api//recoverUserPw", recoverUserPw_1.default); // 비밀번호 찾기 로직
app.use("api//certifyNumber", certifyNumber_1.default); // 인증번호 검증 로직
app.use("/api/changePw", newPw_1.default); // 비밀번호 변경 로직
app.use(researchResultGet_1.default); //* 검색결과 라우터
app.use(naverLogin_1.default); //* 네이버 로그인 라우터
app.use(myPage_1.default); //마이페이지 라우터
app.use(fileUpload_1.default); //* 파일 업로드 라우터
app.use(cookieParser_1.default); //* 쿠키 읽기 라우터
app.use(uploadData_1.default); //* 업로드한 라우터
app.use(addNickName_1.default); //닉네임 추가로직 라우터
app.use(myPageDelete_1.default); //* 마이페이지 게시글,댓글 삭제 라우터
app.use(saju_1.default); // 사주팔자 라우터
app.use(sajuResult_1.default); // 사주팔자 결과값
app.use(myProfileUpdate_1.default); //마이프로필 업데이트 라우터
app.use(myProfilejwtVerify_1.default); //* 마이페이지 진입시 jwt 토큰해독해서 유저정보 반환;
app.use(sessionMiddleware);
app.use(myInfoDataUpdate_1.default);
app.use(myInfoUpdate_1.default); // Patch 요청 내정보 수정 라우터
app.use(jwtTokenExpired_1.default); // jwtExpired 검증로직
app.use(addComments_1.default); // 디테일 페이지 글쓰기 라우터
app.use(addLike_1.default); // 좋아요 로직
app.use(viewComments_1.default); // 쓴 댓글 보기
app.use(viewLikes_1.default); // 좋아요 한 숫자 보기 로직
app.use(googleLogin_1.default);
app.use(viewTotalLikes_1.default); //* 논 로그인 유저 좋아요 로직 보여주기
//* 쿠키 http 통신에 의해서 삭제하는 로직
app.post("/auth/clearCookie", (req, res) => {
    res.clearCookie("token", { path: "/" });
    return res.status(200).json({ message: "쿠키가 잘 삭제되었습니다." });
});
//* 모든 요청에 대한 HTML 반환
// app.use(express.static(path.join(__dirname, "..", "dist")));
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
// });
app.use(express_1.default.static(path_1.default.join(__dirname, ".."))); //* css를 포함한 정적파일 위치
app.get("/*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "..", "index.html")); //* 번들링된 자바스크립트 태그가 존재하는 정적 파일 서빙 위치
});
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`여기서 실행중입니다: ${PORT}`);
});
