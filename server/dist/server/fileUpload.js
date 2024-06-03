"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_s3_1 = __importDefault(require("multer-s3"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const ORM_1 = require("../ORM");
const jwt_1 = require("./jwt");
const userPostEntity_1 = require("../ORM/entity/userPostEntity");
const userInfoEntity_1 = require("../ORM/entity/userInfoEntity");
const router = express_1.default.Router();
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
if (!accessKeyId || !secretAccessKey || !region) {
    throw new Error("키값이 존재하지 않습니다.");
}
const s3 = new client_s3_1.S3({
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
    region,
});
// s3, 사진 게시물 업로드용
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: "karinas",
        acl: "public-read",
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `uploads/${Date.now().toString()}-${file.originalname}`);
        },
    }),
});
router.post("/api/upload", jwt_1.verifyToken, upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "photoSumnail", maxCount: 1 },
]), async (req, res) => {
    try {
        const { userEmail, loginType, identifier } = req.user;
        const userRepository = ORM_1.ormConnection.getRepository(userInfoEntity_1.userInfoData); //* 유저정보 가져옴
        const user = await userRepository.findOne({
            where: loginType === "nonSocial"
                ? { userId: identifier, useremail: userEmail }
                : { username: identifier, useremail: userEmail },
        });
        if (!user) {
            console.log("업로드 하기 위한 유저정보가 존재하지 않습니다.");
            return res.status(404).json({ message: "사용자 찾을수가 없어" });
        }
        console.log(user, "조회된 사용자 정보");
        const UserPost = new userPostEntity_1.userPost();
        UserPost.uuid = req.body.id;
        UserPost.menubar = req.body.menubar;
        UserPost.title = req.body.title;
        UserPost.photosumnail = req.files["photoSumnail"][0].location;
        UserPost.photos = req.files["photos"].map((photo) => photo.location);
        UserPost.userNickName = user.userNickName;
        //* 유저와 게시물 연결
        UserPost.socialUser = user; //
        const userPostRepository = ORM_1.ormConnection.getRepository(userPostEntity_1.userPost);
        await userPostRepository.save(UserPost);
        console.log(UserPost, "업로드한것입니다.");
        res.status(200).json({
            message: "정상적으로 게시물이 업로드 되었습니다.",
            data: { UserPost },
        });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "업로드 에러입니다. 서버쪽 확인하세요" });
    }
});
exports.default = router;
//# sourceMappingURL=fileUpload.js.map