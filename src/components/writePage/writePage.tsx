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
  setCategory: (category: string) => void;
}

const WritePage: React.FC<MaintentsProps> = ({ addToArray, setCategory }) => {
  const navigate = useNavigate();
  const myUUID = uuidv4();
  const [title, setTitle] = useState("");
  const [menubar, setMenubar] = useState(""); // 기본값 설정
  const [photoSumnail, setPhotoSumnail] = useState(""); // 대표 이미지 URL 상태
  const [photos, setPhotos] = useState<string[]>([]); // <sting[]> 을 해줌으로서, 문자열배열 즉, photos가 문자열 배열을 상태로 관리할것을 명시한다.
  console.log(photos, "여기는 변경된 사진의 상태변경함수");
  const [compressedFile, setCompressedPhotoSumnail] = useState<File | null>(
    null
  );
  const [compressedImages, setCompressedImages] = useState<File[]>([]);
  console.log(compressedImages, "여기에 blob 객체가 나와야돼!!");
  //   const handlePhotoSumnailChange = (
  //     event: React.ChangeEvent<HTMLInputElement> // event는 React.ChangeEvent<HTMLInputElement>타입이다. input요소의 변경 이벤트이며, 사용자가 파일을 업로드할때 발생하는 이벤트정보이다.
  //   ) => {
  //     if (event.target.files && event.target.files[0]) {

  //       // envet는 객체, target은 발생한 DOM요소(<input>), files는 선택한 파일(여러개라 배열형태)
  //       setPhotoSumnail(URL.createObjectURL(event.target.files[0])); // 객체의 DOM요소의 파일에 대한 URL을 생성한다. 브라우저 메모리에 있는 파일에 대한 URL이다.
  //     }
  //     // console.log(event.target.files)=> FileList {0: File, length: 1}
  //   };
  const handlePhotoSumnailChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const originalFile = event.target.files[0];

      // 이미지 압축 옵션 설정
      const options = {
        maxSizeMB: 0.5, // 최대 파일 크기
        maxWidthOrHeight: 1280, // 최대 너비 또는 높이
        useWebWorker: true,
      };

      try {
        // 이미지 압축
        const compressedFile = await imageCompression(originalFile, options);

        // 압축된 파일의 URL을 생성하고 상태 업데이트
        setPhotoSumnail(URL.createObjectURL(compressedFile));
        console.log("이미지 압축중!!");

        // 압축된 파일을 나중에 서버로 전송할 수 있도록 저장
        setCompressedPhotoSumnail(compressedFile);
        console.log(compressedFile, "이게 압축된파일");
      } catch (error) {
        console.error("압축 중 에러 발생:", error);
      }
    }
  };
  // 사진 파일 압축 함수
  const handlePhotosChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      };

      try {
        // 각 이미지 파일을 압축하고 Blob URL 생성
        const compressedFiles = await Promise.all(
          files.map((file) => imageCompression(file, options))
        );
        const newFileUrls = compressedFiles.map((file) =>
          URL.createObjectURL(file)
        );
        setPhotos((prevPhotos) => [...prevPhotos, ...newFileUrls]);
        setCompressedImages((prevCompressedImages) => [
          ...prevCompressedImages,
          ...compressedFiles,
        ]);
        if (photos.length + newFileUrls.length > 6) {
          alert("최대 6개의 사진만 선택할 수 있습니다.");
          setPhotos((prevPhotos) =>
            [...prevPhotos, ...newFileUrls].slice(0, 6)
          );
        }
      } catch (error) {
        console.error("압축 중 에러 발생:", error);
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
      uuid: myUUID,
      menubar: menubar,
      title: title,
      photosumnail: photoSumnail,
      photos: photos, // 이미지를 담을수 있는 방법 연구.
    };
    console.log(newKarinaData);
    const formData = new FormData();

    if (compressedFile) {
      formData.append("photoSumnail", compressedFile, compressedFile.name);
    }
    compressedImages.forEach((file) => {
      formData.append("photos", file, file.name);
    });
    formData.append("id", myUUID);
    formData.append("menubar", menubar);
    formData.append("title", title);
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    console.log(object, "여기가 폼데이터값입니다.");
    // 서버의 엔드포인트 URL
    const url = `${process.env.REACT_APP_API_URL}/api/upload`;

    try {
      // fetch API를 사용하여 서버로 POST 요청을 보냄
      const response = await fetch(url, {
        method: "POST",
        body: formData, // FormData 객체를 body로 설정
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const responseData = await response.json();
      console.log(responseData.message, "메시지는 뭐가나오는가");
      console.log(responseData.data.menubar);

      // 성공 처리 로직 (예: 상태 초기화, 사용자에게 알림 등)
      addToArray(responseData.data); // 서버로부터 받은 응답을 사용하도록 변경
      navigate("/");
    } catch (error) {
      console.error("Error sending data to the server:", error);
      // 에러 처리 로직
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
        onChange={(e) => {
          const newMenubar = e.target.value;
          setMenubar(newMenubar);
          setCategory(newMenubar); // 추가된 부분
        }}
      >
        <option value="" disabled selected>
          메뉴바를 선택하세요
        </option>
        <option value="innocence">청순카리나</option>
        <option value="cute">큐트카리나</option>
        <option value="sexy">섹시카리나</option>
        <option value="daily">일상카리나</option>
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
