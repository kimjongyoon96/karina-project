"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const userLikeEntity_1 = require("./entity/userLikeEntity");
const userInfoEntity_1 = require("./entity/userInfoEntity");
const userCommentsEntity_1 = require("./entity/userCommentsEntity");
const nonSocialUserInfoEntity_1 = require("./entity/nonSocialUserInfoEntity");
const userPostEntity_1 = require("./entity/userPostEntity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost", // 또는 'localhost'로 변경
    port: 5432,
    username: process.env.TYPE_ORM_USERNAME,
    password: process.env.TYPE_ORM_PASSWORD,
    database: "postgres",
    entities: [
        userPostEntity_1.userPost,
        userLikeEntity_1.userLike,
        userInfoEntity_1.userInfoData,
        userCommentsEntity_1.userComment,
        nonSocialUserInfoEntity_1.nonSocialUserInfoData,
    ],
    synchronize: false,
    logging: false,
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
//# sourceMappingURL=datasource.js.map