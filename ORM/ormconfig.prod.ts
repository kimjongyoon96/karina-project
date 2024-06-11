import "reflect-metadata";
import { DataSource } from "typeorm";
import { userpost } from "./entity/userPostEntity";
import { userLike } from "./entity/userLikeEntity";
import { userinfodata } from "./entity/userInfoEntity";
import { userComment } from "./entity/userCommentsEntity";
import { nonSocialUserInfoData } from "./entity/nonSocialUserInfoEntity";
import { CustomLogger } from "./entity/customLogger";
import path from "path";
const ormConnection = new DataSource({
  type: "postgres", // 사용하는 데이터베이스 타입
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  //   entities: [__dirname + "/entity/*.js"],
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  synchronize: false, //* 개발 단계에서만 사용

  migrations: [__dirname + "/migrations/*.js"],
});

ormConnection
  .initialize()
  .then(() => {
    console.log("orm 이 정상적으로 initalize 되었다");
  })
  .catch((error) =>
    console.error("orm이 비정상적으로 에러가 발생했다:", error)
  );

export default ormConnection;
