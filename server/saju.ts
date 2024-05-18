import express from "express";
import { collaboWithjksu } from "./service/collaboration";
const router = express.Router();

router.post("/api/collabo", async (req: any, res) => {
  const { inputName, menubar, userSelected, userSelectedSex } = req.body;

  if (!inputName || !menubar || !userSelected || !userSelectedSex) {
    return res.status(404).json({ message: "하나라도 없으면 안됩니다." });
  }
  console.log(inputName, menubar, userSelected, userSelectedSex);
  //d,cow,jang,male
  // 이름,띠,상대연예인,성별
  try {
    const collaboInstance = new collaboWithjksu(
      inputName,
      menubar,
      userSelected,
      userSelectedSex
    );
    const result = collaboInstance.processInput();
    console.log(result, "띠의값");
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ messgae: "띠 궁합 결과가 없습니다." });
    }
  } catch (error) {
    console.error(error, "사주팔자 에러발생");
    res.status(500).json({ message: "사주팔자 서버 에러, 확인하세요" });
  }
});

export default router;
