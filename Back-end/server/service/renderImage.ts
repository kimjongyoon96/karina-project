import dotenv from "dotenv";
import path from "path";
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
dotenv.config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV === "production" ? "../../../.env" : "../../.env"
  ),
});

//* 특정 폴더의 파일 목록을 가져오는 함수
const getImage = new S3Client({
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
export const listFilesInFolder = async (folder) => {
  const params = {
    Bucket: bucketName,
    Prefix: folder,
  };

  const command = new ListObjectsV2Command(params);

  try {
    const data = await getImage.send(command);
    if (data.Contents) {
      const fileDetails = await Promise.all(
        data.Contents.map(async (item) => {
          const signedUrl = await getSignedUrl(
            getImage,
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
