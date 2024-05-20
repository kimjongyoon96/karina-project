import express from "express";
// import { sajuResultType } from "./sajuResultType";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const router = express.Router();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
//* 특정 폴더의 파일 목록을 가져오는 함수

const bucketName = process.env.S3_BUCKET_NAME;
if (!bucketName) {
  throw new Error("S3_BUCKET_NAME 환경 변수가 설정되지 않았습니다.");
}

// 특정 폴더의 파일 목록을 가져오는 함수
const listFilesInFolder = async (folderName) => {
  const params = {
    Bucket: bucketName, // sajuresultgif
    Prefix: folderName, //* 지정된 폴더
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    if (!data.Contents) {
      return;
    }
    return data.Contents.map((item) => item.Key);
  } catch (error) {
    console.error(`Error fetching files from folder ${folderName}:`, error);
    throw error;
  }
};

// 특정 파일을 가져오는 함수
const getFile = async (key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    return { Body: data.Body, ContentType: data.ContentType };
  } catch (error) {
    console.error(`Error fetching file ${key}:`, error);
    throw error;
  }
};

router.get("/api/sajuRenderImage", async (req: any, res) => {
  const { type, targetName } = req.query;
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
  const folders = compatibilityToFolderMap?.[type];
  if (!folders) {
    return res.status(400).json({ message: "타입이 없습니다." });
  }
  const nameInCludes = nameIncludesMap?.[targetName];
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
    const filekey = filekeysArray.flat();
    console.log(filekey, "뭐가오나 보자 , 파일이 왕한다.");

    const targetFileKey = filekey.find((key) => key?.includes(nameInCludes));
    console.log(targetFileKey, "정확한 명칭이 나와야한다."); // 문자열이 출력이 된다.

    // const filesPromise = filekey.map((key) => getFile(key));
    // const files = await Promise.all(filesPromise);
    // console.log(files);
    // const processdFiles = files.map((file) => ({
    //   contentType: file.ContentType,
    //   data: file.Body?.toString("base64"),
    // }));
    // res.status(200).json(processdFiles);
    const file = await getFile(targetFileKey);
    const processedFile = {
      contentType: file.ContentType,
      data: file.Body?.toString("base64"),
    };

    console.log(processedFile);
    return res.status(200).json(processedFile);
  } catch (error) {
    res.status(500).json({ message: "궁합 결과 렌더링 서버 에러입니다." });
  }
});

export default router;
