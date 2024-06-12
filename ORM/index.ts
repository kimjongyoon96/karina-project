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
  host: process.env.DB_HOST || "db",
  port: 5432,
  username: process.env.DB_USER || "kimjongyoon",
  password: process.env.DB_PASSWORD || "dkrlaos1",
  database: process.env.DB_NAME || "postgres",
  // entities: [__dirname + "/entity/*.ts"],
  entities: [
    userpost,
    userLike,
    userinfodata,
    userComment,
    nonSocialUserInfoData,
  ],
  synchronize: true, //* 개발 단계에서만 사용
  // logging: true,
  // logger: new CustomLogger(),
  migrations: [__dirname + "/migrations/*.ts"], //* 배포할때 마이그레이션 파일
  // migrations: [__dirname + "/migrations/*.js"], //* 배포할떄에 마이그레이션 파일 참조는 자바스크립트로 참조한다.
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
