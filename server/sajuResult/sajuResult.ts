import express from "express";
// import { sajuResultType } from "./sajuResultType";
import dotenv from "dotenv";
import path from "path";
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
const router = express.Router();

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
      const fileDetails = await Promise.all(
        data.Contents.map(async (item) => {
          const signedUrl = await getSignedUrl(
            s3Client,
            new GetObjectCommand({
              Bucket: bucketName,
              Key: item.Key,
            }),
            { expiresIn: 3600 }
          ); // URL 유효기간(초)

          return {
            key: item.Key,
            URL: signedUrl,
          };
        })
      );
      return fileDetails;
    }
    console.log("data인디", data);
    return [];
  } catch (error) {
    throw new Error("에러가 발생했습니다: " + error.message);
  }
};

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
    const filterData = await filekeysArray.map(
      (innerArray) =>
        innerArray?.filter((item) => item.key?.includes(nameInCludes))
    );
    console.log(filterData);

    const filterFile = filterData.flat().map((itme) => itme?.URL);
    console.log(filterFile);

    return res.status(200).json(filterFile);
  } catch (error) {
    res.status(500).json({ message: "궁합 결과 렌더링 서버 에러입니다." });
  }
});

export default router;
