"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConnection = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const userPostEntity_1 = require("./entity/userPostEntity");
const userLikeEntity_1 = require("./entity/userLikeEntity");
const userInfoEntity_1 = require("./entity/userInfoEntity");
const userCommentsEntity_1 = require("./entity/userCommentsEntity");
const nonSocialUserInfoEntity_1 = require("./entity/nonSocialUserInfoEntity");
const customLogger_1 = require("./entity/customLogger");
exports.ormConnection = new typeorm_1.DataSource({
    type: "postgres", // 사용하는 데이터베이스 타입
    host: "db",
    port: 5432,
    username: `${process.env.TYPE_ORM_USERNAME}`,
    password: `${process.env.TYPE_ORM_PASSWORD}`,
    database: "postgres",
    entities: [
        userPostEntity_1.userPost,
        userLikeEntity_1.userLike,
        userInfoEntity_1.userInfoData,
        userCommentsEntity_1.userComment,
        nonSocialUserInfoEntity_1.nonSocialUserInfoData,
    ],
    synchronize: false, // 개발할때만 사용, 배포시 마이그레이션
    // logging: true,
    logger: new customLogger_1.CustomLogger(),
});
exports.ormConnection
    .initialize()
    .then(() => {
    console.log("orm 이 정상적으로 initalize 되었다");
})
    .catch((error) => console.error("orm이 비정상적으로 에러가 발생했다:", error));
exports.default = exports.ormConnection;
//# sourceMappingURL=index.js.map