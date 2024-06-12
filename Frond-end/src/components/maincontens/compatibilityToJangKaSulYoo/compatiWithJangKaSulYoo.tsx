import React, { useEffect, useState } from "react";
import "./compatibility.css";
import jangSelected from "../../../assets/resource/jangSelected.gif";
import karinaSelected from "../../../assets/resource/karinaSelected.gif";
import sulSelected from "../../../assets/resource/sulSelected.gif";
import yunaSelected from "../../../assets/resource/yunaSelected.gif";
import useAuthStore from "../../../JustAnd/GlobalState";
interface typeModule {
  inputName: string;
  menubar: string;
  userSelected: string;
  userSelectedSex: string;
}
interface saveDataType {
  saveData: typeModule[];
}
interface inputNameType {
  inputName: string;
  finalName: string;
}
const CompatiWithJangKaSuYoo: React.FC = () => {
  const [inputName, setInPutName] = useState<string>("");
  const [finalName, setFinalName] = useState<string>("");
  const [menubar, setMenubar] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [userSelected, setUserSelected] = useState<string>("");
  const [saveData, setSaveData] = useState<typeModule | null>(null);
  const [bringImage, setBringImage] = useState("");
  const [isInputSaved, setIsInputSaved] = useState(false);

  console.log(saveData, "모든 최종적인 값들입니다.");
  const { collaboResult, setCollaboResult } = useAuthStore(
    (state) => state.collaboResultData
  );
  console.log(collaboResult, "전역변수로 설정되어있는데 큭큭..");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInPutName(e.target.value);
    0;
  };

  const handleInputSave = () => {
    setFinalName(inputName);
    setIsInputSaved(true);
  };
  const handleImage = (newMenubar) => {
    setBringImage(newMenubar);
    console.log(bringImage, "이미지가 뭐가나오나 보자");
  };

  const renderImage = () => {
    switch (bringImage) {
      case "jang":
        return <img src={jangSelected} alt="장원영 이미지" />;
        break;
      case "karina":
        return <img src={karinaSelected} alt="카리나 이미지" />;
        break;
      case "sul":
        return <img src={sulSelected} alt="설윤 이미지" />;
        break;
      case "yuna":
        return <img src={yunaSelected} alt="유나 이미지" />;
      default:
        return null;
    }
  };
  const fetchForCollabo = async () => {
    const dataToSave = {
      inputName: finalName,
      menubar: menubar,
      userSelected: userSelected,
      userSelectedSex: sex,
    };
    if (!finalName || !menubar || !userSelected || !sex) {
      alert("모두 입력하셔야 합니다.");
      return;
    }
    setSaveData(dataToSave);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/collabo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSave),
        }
      );
      if (!response.ok) {
        throw new Error(`궁합에러:${response.status}`);
      }
      const responseData = await response.json();

      console.log(responseData, "뭐가오나");
      setCollaboResult(responseData);
    } catch (error) {
      console.error("궁합보기 에러", error);
    }
  };
  return (
    <main className="compatibility-box">
      <h1>장카설유 궁합보기!</h1>
      <div className="sections-container">
        <div className="input-section-wrapper">
          <section className="input-user-section">
            <h2>이름을 입력하세요</h2>
            <input
              type="text"
              className="user-name-input"
              placeholder="이름을 입력하세요"
              value={inputName}
              onChange={handleInputChange}
            />
            <button onClick={handleInputSave} disabled={isInputSaved}>
              입력
            </button>
            <select
              className="sex-select"
              value={sex}
              onChange={(e) => {
                const selectSex = e.target.value;
                setSex(selectSex);
              }}
            >
              <option value="" disabled selected>
                성별을 선택하세요
              </option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
            <select
              className="menubar-select"
              value={menubar}
              onChange={(e) => {
                const newMenubar = e.target.value;
                setMenubar(newMenubar);
              }}
            >
              <option value="" disabled selected>
                당신의 띠를 고르세요!
              </option>
              <option value="mouse">쥐띠</option>
              <option value="cow">소띠</option>
              <option value="tiger">호랑이띠</option>
              <option value="rabbit">토끼띠</option>
              <option value="dragon">용띠</option>
              <option value="snake">뱀띠</option>
              <option value="horse">말띠</option>
              <option value="sheep">양띠</option>
              <option value="monkey">원숭이띠</option>
              <option value="chicken">닭띠</option>
              <option value="dog">개띠</option>
              <option value="pig">돼지띠</option>
            </select>
          </section>
          <section className="select-target-section">
            <h2>대상을 선택하세요</h2>
            <select
              className="menubar-select-right"
              value={userSelected}
              onChange={(e) => {
                const newMenubar = e.target.value;
                setUserSelected(newMenubar);
                handleImage(newMenubar);
              }}
            >
              <option value="" disabled selected>
                누구와 궁합을 보시겠어요?
              </option>
              <option value="jang">장원영</option>
              <option value="karina">카리나</option>
              <option value="sul">설윤</option>
              <option value="yuna">유나</option>
            </select>
          </section>
        </div>
        <div className="section-gif">
          <section className="right-gif-box">{renderImage()}</section>
        </div>
      </div>
      <button className="submit-button" onClick={fetchForCollabo}>
        궁합보기
      </button>
    </main>
  );
};

export default CompatiWithJangKaSuYoo;

//* 옵션 셀렉트 하면 밸류값에 따라서  오른쪽에 다른 jpg 렌더링. (gif)
//* 궁합 보기 결과가 클라이언트로 오면, 다른 컴포넌트 렌더링
//* 그 컴포넌트는 결과값을 렌더링, 중앙에 결과값, 천생연분,약간호감,나쁜,상극 에 따라서 경우의수 16가지 gif
//* 총 20개의 gif가 필요
//* 옵션 select에 따른 움짤4개 , 결과값에 따른 16개의 gif
