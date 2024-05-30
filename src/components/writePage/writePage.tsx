import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { karinaData, AuthContextType } from "../../types/contentType";
import "./writePage.css";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import useAuthStore from "../../JustAnd/GlobalState";

// 상위 컴포넌트로부터, MaintentsProps 인터페이스를 통해, prop을 받는다.
// addToArray라는 함수는, obj라는 인자를 받고, obj는 karinadata이다.
interface Errors {
  title?: string;
  menubar?: string;
  photoSumnail?: string;
  photos?: string;
}
const WritePage: React.FC = () => {
  const navigate = useNavigate();
  const myUUID = uuidv4();
  const [title, setTitle] = useState("");
  const [menubar, setMenubar] = useState(""); // 기본값 설정
  const [photoSumnail, setPhotoSumnail] = useState(""); // 대표 이미지 URL 상태
  const [photos, setPhotos] = useState<string[]>([]);
  console.log(photos, "여기는 변경된 사진의 상태변경함수");
  const [compressedFile, setCompressedPhotoSumnail] = useState<File | null>(
    null
  );
  const [compressedImages, setCompressedImages] = useState<File[]>([]);
  const { jwtDecodingData } = useAuthStore((state) => state.jwtGlobal);
  const [errors, setErrors] = useState<Errors>({});
  console.log(compressedImages, "여기에 blob 객체가 나와야돼!!");
  const validateForm = () => {
    const newErrors: Errors = {};
    if (!title.trim()) newErrors.title = "제목을 입력해주세요";
    if (!menubar.trim()) newErrors.menubar = "게시판을 선택해주세요";
    if (!photoSumnail) newErrors.photoSumnail = "썸네일을 업로드해주세요";
    if (photos.length === 0) newErrors.photos = "사진을 업로드해주세요";
    return newErrors;
  };

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
      console.log("imageCompresiion Check");
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

  //* 핸들함수 작동 => addToArray 함수 작동 => 카테고리에 맞는
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
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
    const url = `${process.env.REACT_APP_API_URL}/api/upload?`;

    try {
      // fetch API를 사용하여 서버로 POST 요청을 보냄
      const response = await fetch(url, {
        method: "POST",
        body: formData,

        headers: {
          Authorization: `${jwtDecodingData?.["token"]}`,
        },
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const responseData = await response.json();
      console.log(responseData.data.menubar);

      navigate("/");
    } catch (error) {
      console.error("Error sending data to the server:", error);
      // 에러 처리 로직
    }
  };

  return (
    <div className="write-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="title-input"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        .
        <select
          className="menubar-select"
          value={menubar}
          onChange={(e) => {
            const newMenubar = e.target.value;
            setMenubar(newMenubar);
          }}
        >
          <option value="" disabled selected>
            게시판을 선택하세요
          </option>
          <option value="jang">장원영</option>
          <option value="karina">카리나</option>
          <option value="sulyoon">설윤</option>
          <option value="yoona">유나</option>
        </select>
        <input
          type="file"
          className="photo-thumbnail-input"
          onChange={handlePhotoSumnailChange}
        />
        <div className="photos-Thumnail-preview">
          <img src={photoSumnail} />
        </div>
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
        <button type="submit" className="submit-button">
          등록
        </button>
      </form>
    </div>
  );
};

export default WritePage;
