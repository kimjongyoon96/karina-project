import express from "express";
// import { sajuResultType } from "./sajuResultType";
import dotenv from "dotenv";
import path from "path";
import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const router = express.Router();
// const credentials = new AWS.fromInoi({
//   profile: "kimjongyoons96",
// });
// AWS.config.credentials = credentials;
// console.log(credentials);
// AWS.config.update({ region: "ap-northeast-2" || "us-east-1" });
// const S3 = new AWS.S3();
//* 특정 폴더의 파일 목록을 가져오는 함수
const s3Client = new S3Client({
  region: "ap-northeast-2" || "us-east-1",
  credentials: fromIni({ profile: "kimjongyoons96" }),
});
const bucketName = process.env.S3_BUCKET_NAME;
console.log(bucketName, "박게스 네임");
if (!bucketName) {
  throw new Error("S3_BUCKET_NAME 환경 변수가 설정되지 않았습니다.");
}

//바로 특정 버킷의 폴더에 접근가능
// ex) akarinass 버킷의 경멸/ 폴더에 접근가능
const listFilesInFolder = async (folder) => {
  const params = {
    Bucket: bucketName,
    Prefix: folder,
  };

  const command = new ListObjectsV2Command(params);

  try {
    const data = await s3Client.send(command);

    if (data.Contents) {
      return data.Contents.map((item) => ({
        key: item.Key,
        URL: `https://${bucketName}.s3.amazonaws.com/${item.Key}`,
      }));
    }
    return;
  } catch (error) {
    throw new Error("에러가발생");
  }
};

// // 특정 파일을 가져오는 함수
// const getFile = async (key) => {
//   const params = {
//     Bucket: bucketName,
//     Key: key,
//   };

//   try {
//     const data = await s3Client.send(new ListBucketsCommand({}));
//     return { Body: data.Buckets };
//   } catch (error) {
//     console.error(`Error fetching file ${key}:`, error);
//     throw error;
//   }
// };

router.get("/api/sajuRenderImage", async (req: any, res) => {
  //*type:약간호감 , targetName:장원영
  const { type, targetName } = req.query;
  console.log(type, targetName, "ㅇ클라이언트 ");
  const compatibilityToFolderMap = {
    상극: ["경멸/"],
    별로안맞음: ["별로/"],
    약간호감: ["좋음/"],
    천생연분: ["완전호감/"],
  };
  const nameIncludesMap = {
    장원영: "Jang",
    카리나: "Karina",
    설윤: "Sulyoon",
    유나: "Yuna",
  };
  const folders = compatibilityToFolderMap?.[type]; // tpye이 상극이면 경멸
  if (!folders) {
    return res.status(400).json({ message: "타입이 없습니다." });
  }
  const nameInCludes = nameIncludesMap?.[targetName]; // Target이 장원영이면 Jang
  if (!nameInCludes) {
    return res.status(400).json({ messgae: "타겟 이름이 없습니다." });
  }
  try {
    if (!Array.isArray(folders)) {
      return res.status(400).json({ message: "폴더가 배열이 아닙니다." });
    }
    const fileKeysPromise = folders.map((folder) => {
      console.log(`Listing files in folder: ${folder}`);
      return listFilesInFolder(folder);
    });
    const filekeysArray = await Promise.all(fileKeysPromise);

    console.log(filekeysArray, "뭐가오나 보자 , 파일이 왕한다.");

    const targetFileKey = filekeysArray.find(
      (key) => key?.includes(nameInCludes)
    );
    console.log(targetFileKey, "정확한 명칭이 나와야한다."); // 문자열이 출력이 된다.
    const filterData = filekeysArray.map(
      (innerArray) =>
        innerArray?.filter((item) => item.key?.includes(nameInCludes))
    );
    console.log(filterData);
    // const file = await getFile(targetFileKey);
    // const processedFile = {
    //   contentType: file.ContentType,
    //   data: file.Body?.toString("base64"),
    // };

    // console.log(processedFile);
    // return res.status(200).json(processedFile);
    return res.status(200);
  } catch (error) {
    res.status(500).json({ message: "궁합 결과 렌더링 서버 에러입니다." });
  }
});

export default router;
