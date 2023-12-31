import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { karinaData } from "../../types/contentType";
import "./writePage.css";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";

// 상위 컴포넌트로부터, MaintentsProps 인터페이스를 통해, prop을 받는다.
// addToArray라는 함수는, obj라는 인자를 받고, obj는 karinadata이다.
interface MaintentsProps {
  addToArray: (obj: karinaData) => void;
}

// writePage 라는 함수형 컴포넌트 선언
// 리액트 함수형 컴포넌트이며, MaintentsProps 인터페이스에 정의된 props를 받아들이겠다.
// 구조분해할당을 통해, addToArray를 인터페이스에서 뽑아서 쓰겠다.
const WritePage: React.FC<MaintentsProps> = ({ addToArray }) => {
  const navigate = useNavigate();
  const myUUID = uuidv4();
  const [title, setTitle] = useState("");
  const [menubar, setMenubar] = useState("청순카리나"); // 기본값 설정
  const [photoSumnail, setPhotoSumnail] = useState(""); // 대표 이미지 URL 상태
  const [photos, setPhotos] = useState<string[]>([]); // <sting[]> 을 해줌으로서, 문자열배열 즉, photos가 문자열 배열을 상태로 관리할것을 명시한다.
  console.log(photos);
  console.log("photos");
  const handlePhotoSumnailChange = (
    event: React.ChangeEvent<HTMLInputElement> // event는 React.ChangeEvent<HTMLInputElement>타입이다. input요소의 변경 이벤트이며, 사용자가 파일을 업로드할때 발생하는 이벤트정보이다.
  ) => {
    if (event.target.files && event.target.files[0]) {
      // envet는 객체, target은 발생한 DOM요소(<input>), files는 선택한 파일(여러개라 배열형태)
      setPhotoSumnail(URL.createObjectURL(event.target.files[0])); // 객체의 DOM요소의 파일에 대한 URL을 생성한다. 브라우저 메모리에 있는 파일에 대한 URL이다.
    }
    // console.log(event.target.files)=> FileList {0: File, length: 1}
  };

  const handlePhotosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // 선택한 새 파일들의 URL 배열 생성
      const newFileUrls = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      //   console.log(newFileUrls);   // ['blob:http://localhost:3001/45aa4d37-490b-4a98-8d8d-5039d58943e2']

      // 새 파일의 URL을 기존 photos 배열에 추가
      setPhotos((prevPhotos) => [...prevPhotos, ...newFileUrls]); // newFileUrls의 값이 prevPhotos의 배열에 전달

      // 선택한 파일이 총 6개를 초과하는 경우 경고하고 초과분을 제거
      if (photos.length + newFileUrls.length > 6) {
        alert("최대 6개의 사진만 선택할 수 있습니다.");
        setPhotos((prevPhotos) => [...prevPhotos, ...newFileUrls].slice(0, 6));
      }
    }
  };
  // 폼 제출 시 실행될 함수
  // 백엔드 로 객체(키,값) 그대로 보내기
  // 백엔드에서 정보 받고, 버킷으로 보낸다.
  // 보낸다음에 버킷에서 생성된 url을 서버에서 다시 받는다.
  // 받은 정보를, DB에 저장한다.
  // DB에 저장된 객체의 정보들을 다시 프론트로 쏴준다. 쏴주는 이유는 한번더 필터링(지시사항)
  // fetch로 Post 요청 어렵다.
  // fetch 요청시 이미지는 몸체를 한번에 보내야 한다 .

  const handleSubmit = async () => {
    const newKarinaData: karinaData = {
      id: myUUID,
      menubar: menubar,
      title: title,
      photoSumnail: photoSumnail,
      photos: photos, // 이미지를 담을수 있는 방법 연구.
    };
    const url = "http://localhost:3000/api/test";

    try {
      // Fetch API를 사용하여 서버로 POST 요청을 보냅니다.
      const response = await fetch(url, {
        method: "POST", // 요청 방식
        headers: {
          "Content-Type": "application/json", // 내용 형식 지정
        },
        body: JSON.stringify(newKarinaData), // JavaScript 객체를 JSON 문자열로 변환
      });

      if (!response.ok) {
        // 서버로부터 응답이 정상이 아닌 경우 에러 처리
        throw new Error(`Error: ${response.status}`);
      }

      // 응답 데이터를 JSON으로 변환
      const responseData = await response.json();
      console.log("Server response:", responseData);

      // 성공적인 응답 후 처리, 예를 들어 addToArray 함수 호출
      addToArray(newKarinaData);

      // 사용자를 다른 페이지로 이동시킵니다.
      navigate("/");
    } catch (error) {
      // 에러 처리
      console.error("Error sending data to the server:", error);
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        className="title-input"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="menubar-select"
        value={menubar}
        onChange={(e) => setMenubar(e.target.value)}
      >
        <option value="청순카리나">청순카리나</option>
        <option value="큐트카리나">큐트카리나</option>
        <option value="섹시카리나">섹시카리나</option>
        <option value="일상카리나">일상카리나</option>
      </select>

      <input
        type="file"
        className="photo-thumbnail-input"
        onChange={handlePhotoSumnailChange}
      />

      <input
        type="file"
        className="photos-input"
        multiple
        onChange={handlePhotosChange}
      />
      {/* 사용자가 선택한 사진들을 보여주는 부분 */}
      <div className="photos-preview">
        {photos.map((photoUrl, index) => (
          <img
            key={index}
            src={photoUrl}
            alt={`선택한 사진 ${index + 1}`}
            className="photo-thumbnail"
          />
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        등록
      </button>
    </div>
  );
};

export default WritePage;

// https://i.pinimg.com/originals/6d/39/3a/6d393a3ba393c8306b8f5fdd79756cc0.gif
