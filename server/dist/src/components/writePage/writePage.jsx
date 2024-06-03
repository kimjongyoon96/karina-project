"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("./writePage.css");
const uuid_1 = require("uuid");
const browser_image_compression_1 = __importDefault(require("browser-image-compression"));
const GlobalState_1 = __importDefault(require("../../JustAnd/GlobalState"));
const WritePage = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const myUUID = (0, uuid_1.v4)();
    const [title, setTitle] = (0, react_1.useState)("");
    const [menubar, setMenubar] = (0, react_1.useState)(""); // 기본값 설정
    const [photoSumnail, setPhotoSumnail] = (0, react_1.useState)(""); // 대표 이미지 URL 상태
    const [photos, setPhotos] = (0, react_1.useState)([]);
    console.log(photos, "여기는 변경된 사진의 상태변경함수");
    const [compressedFile, setCompressedPhotoSumnail] = (0, react_1.useState)(null);
    const [compressedImages, setCompressedImages] = (0, react_1.useState)([]);
    const { jwtDecodingData } = (0, GlobalState_1.default)((state) => state.jwtGlobal);
    const [errors, setErrors] = (0, react_1.useState)({});
    const [isValiable, setIsValiable] = (0, react_1.useState)(true);
    console.log(compressedImages, "여기에 blob 객체가 나와야돼!!");
    const validateForm = () => {
        const newErrors = {};
        if (!title.trim())
            newErrors.title = "제목을 입력해주세요";
        if (!menubar.trim())
            newErrors.menubar = "게시판을 선택해주세요";
        if (!photoSumnail)
            newErrors.photoSumnail = "썸네일을 업로드해주세요";
        if (photos.length === 0)
            newErrors.photos = "사진을 업로드해주세요";
        return newErrors;
    };
    const handleRemove = () => {
        setIsValiable(false);
    };
    const handlePhotoSumnailChange = async (event) => {
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
                const compressedFile = await (0, browser_image_compression_1.default)(originalFile, options);
                // 압축된 파일의 URL을 생성하고 상태 업데이트
                setPhotoSumnail(URL.createObjectURL(compressedFile));
                console.log("이미지 압축중!!");
                // 압축된 파일을 나중에 서버로 전송할 수 있도록 저장
                setCompressedPhotoSumnail(compressedFile);
                console.log(compressedFile, "이게 압축된파일");
            }
            catch (error) {
                console.error("압축 중 에러 발생:", error);
            }
        }
    };
    // 사진 파일 압축 함수
    const handlePhotosChange = async (event) => {
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
                const compressedFiles = await Promise.all(files.map((file) => (0, browser_image_compression_1.default)(file, options)));
                const newFileUrls = compressedFiles.map((file) => URL.createObjectURL(file));
                setPhotos((prevPhotos) => [...prevPhotos, ...newFileUrls]);
                setCompressedImages((prevCompressedImages) => [
                    ...prevCompressedImages,
                    ...compressedFiles,
                ]);
                if (photos.length + newFileUrls.length > 6) {
                    alert("최대 6개의 사진만 선택할 수 있습니다.");
                    setPhotos((prevPhotos) => [...prevPhotos, ...newFileUrls].slice(0, 6));
                }
            }
            catch (error) {
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
        const newKarinaData = {
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
            if (!response.ok)
                throw new Error(`Error: ${response.status}`);
            const responseData = await response.json();
            console.log(responseData.data.menubar);
            navigate("/");
        }
        catch (error) {
            console.error("Error sending data to the server:", error);
            // 에러 처리 로직
        }
    };
    return (<div className="write-container">
      <form onSubmit={handleSubmit}>
        <input type="text" className="title-input" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)}/>
        .
        <select className="menubar-select" value={menubar} onChange={(e) => {
            const newMenubar = e.target.value;
            setMenubar(newMenubar);
        }}>
          <option value="" disabled selected>
            게시판을 선택하세요
          </option>
          <option value="jang">장원영</option>
          <option value="karina">카리나</option>
          <option value="sulyoon">설윤</option>
          <option value="yoona">유나</option>
        </select>
        <input type="file" className="photo-thumbnail-input" onChange={handlePhotoSumnailChange}/>
        <div className="photos-Thumnail-preview">
          {isValiable && (<div className="thumbnail-container">
              <img src={photoSumnail} className="thumbnail-image" alt="thumbnail"/>
              <button className="close-button" onClick={handleRemove}>
                X
              </button>
            </div>)}
        </div>
        <input type="file" className="photos-input" multiple onChange={handlePhotosChange}/>
        {/* 사용자가 선택한 사진들을 보여주는 부분 */}
        <div className="photos-preview">
          {photos.map((photoUrl, index) => (<img key={index} src={photoUrl} alt={`선택한 사진 ${index + 1}`} className="photo-thumbnail"/>))}
        </div>
        <button type="submit" className="submit-button">
          등록
        </button>
      </form>
    </div>);
};
exports.default = WritePage;
//# sourceMappingURL=writePage.jsx.map