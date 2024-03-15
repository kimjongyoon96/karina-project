import "reflect-metadata";
import { DataSource } from "typeorm";
import { userPost } from "./entity/userPostEntity";
import { userLike } from "./entity/userLikeEntity";
import { userInfoData } from "./entity/userInfoEntity";
import { userComment } from "./entity/userCommentsEntity";
const ormConnection = new DataSource({
  type: "postgres", // 사용하는 데이터베이스 타입
  host: "db",
  port: 5432,
  username: `${process.env.TYPE_ORM_USERNAME}`,
  password: `${process.env.TYPE_ORM_PASSWORD}`,
  database: "karina",
  entities: [userPost, userLike, userInfoData, userComment],
  synchronize: true, // 개발할때만 사용, 배포시 마이그레이션
});

ormConnection
  .initialize()
  .then(() => {
    console.log("orm 이 정상적으로 initalize 되었다");
  })
  .catch((error) =>
    console.error("orm이 비정상적으로 에러가 발생했다:", error)
  );
