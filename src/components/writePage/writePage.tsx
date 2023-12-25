import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { karinaData } from "../../types/contentType";
import "./writePage.css";

// 상위 컴포넌트로 부터 받을 props 설정
interface MaintentsProps {
  addToArray: (obj: karinaData) => void;
}

// writePage 라는 함수형 컴포넌트 선언
const WritePage: React.FC<MaintentsProps> = ({ addToArray }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [menubar, setMenubar] = useState("청순카리나"); // 기본값 설정
  const [photoSumnail, setPhotoSumnail] = useState(""); // 대표 이미지 URL 상태
  const [photos, setPhotos] = useState<string[]>([]); // 추가
  const handlePhotoSumnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setPhotoSumnail(URL.createObjectURL(event.target.files[0])); // 첫 번째 파일을 대표 이미지로 설정
    }
  };

  const handlePhotosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // 선택한 새 파일들의 URL 배열 생성
      const newFileUrls = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      // 새 파일의 URL을 기존 photos 배열에 추가
      setPhotos((prevPhotos) => [...prevPhotos, ...newFileUrls]);

      // 선택한 파일이 총 6개를 초과하는 경우 경고하고 초과분을 제거
      if (photos.length + newFileUrls.length > 6) {
        alert("최대 6개의 사진만 선택할 수 있습니다.");
        setPhotos((prevPhotos) => [...prevPhotos, ...newFileUrls].slice(0, 6));
      }
    }
  };
  // 폼 제출 시 실행될 함수
  const handleSubmit = () => {
    const newKarinaData: karinaData = {
      id: Date.now(), // 고유 ID 생성을 위해 현재 시간 사용 (임시 방편)
      menubar: menubar,
      title: title,
      photoSumnail: photoSumnail,
      photos: photos,
    };

    addToArray(newKarinaData);
    navigate("/");
    // console.log(newKarinaData);
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
