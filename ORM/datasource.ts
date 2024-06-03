import { DataSource } from "typeorm";
import { userLike } from "./entity/userLikeEntity";
import { userInfoData } from "./entity/userInfoEntity";
import { userComment } from "./entity/userCommentsEntity";
import { nonSocialUserInfoData } from "./entity/nonSocialUserInfoEntity";
import { userPost } from "./entity/userPostEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost", // 또는 'localhost'로 변경
  port: 5432,
  username: process.env.TYPE_ORM_USERNAME,
  password: process.env.TYPE_ORM_PASSWORD,
  database: "postgres",
  entities: [
    userPost,
    userLike,
    userInfoData,
    userComment,
    nonSocialUserInfoData,
  ],
  synchronize: false,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
