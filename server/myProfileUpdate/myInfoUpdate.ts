import express from "express";
import { verifyToken } from "../jwt";

import { userInfoData } from "../..//ORM/entity/userInfoEntity";
import ormConnection from "../..//ORM";

const router = express.Router();

router.patch("/api/usersPatch", verifyToken, async (req: any, res) => {
  const { userEmail, identifier, loginType } = req.user;
  const updatedData = req.body;
  console.log("body에 싫을거:", updatedData);
  const filteredData = Object.entries(updatedData)
    .filter(([key, value]) => value !== null)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  console.log(filteredData);
  try {
    const userRepository = ormConnection.getRepository(userInfoData);
    const user = await userRepository.findOne({
      where:
        loginType === "nonSocial"
          ? {
              userId: identifier,
              useremail: userEmail,
            }
          : { username: identifier, useremail: userEmail },
    });
    if (!user) {
      return res
        .status(404)
        .json({ error: "찾아야 하는 사용자가 존재하지 않습니다." });
    }
    const updateSuccess = await userRepository.update(user.id, filteredData);
    if (updateSuccess) {
      res.status(200).json({ message: "업데이트에 성공했습니다." });
    }
  } catch (error) {
    console.error("개인정보 수정하는데에 에러가 발생했습니다.");
    return res
      .status(500)
      .json({ message: "개인정보 수정 라우터 에러입니다." });
  }
});

export default router;
