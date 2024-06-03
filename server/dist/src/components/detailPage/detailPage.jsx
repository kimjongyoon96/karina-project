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
require("./detailPage.css");
const GlobalState_1 = __importDefault(require("../../JustAnd/GlobalState"));
const react_router_dom_2 = require("react-router-dom");
const DetailComponent = () => {
    const navigate = (0, react_router_dom_2.useNavigate)();
    const [comments, setComments] = (0, react_1.useState)([]);
    const [commentText, setCommentText] = (0, react_1.useState)("");
    const [totalLikes, setTotalLikes] = (0, react_1.useState)(0);
    const [hasLiked, setHasLiked] = (0, react_1.useState)(false);
    const { jwtDecodingData } = (0, GlobalState_1.default)((state) => state.jwtGlobal);
    const { setAllertMessage, showAlertMessage, setConfirmAction, hideAlert } = (0, GlobalState_1.default)((state) => state.alertState);
    const { mainContentsData } = (0, GlobalState_1.default)((state) => state.mainContentsGlobal);
    const { mainMountData } = (0, GlobalState_1.default)((state) => state.mainMountRenderData);
    const { uuid } = (0, react_router_dom_1.useParams)();
    const itemId = uuid !== undefined ? uuid : null;
    console.log("해당 게시물의 UUID의 값:", itemId); //* 여기까지 MyArray 필요없음
    //* itemId가 null이 아니면 배열에서 uuid가 일치하는 것 찾음
    // const post =
    //   itemId !== null ? mainContentsData.find((p) => p.uuid === itemId) : null;
    // console.table(post);
    const post = itemId !== null
        ? (mainContentsData
            ? mainContentsData.find((p) => p.uuid === itemId)
            : null) ||
            (mainMountData ? mainMountData.find((p) => p.uuid === itemId) : null)
        : null;
    const handleModal = () => {
        if (!jwtDecodingData) {
            setAllertMessage("로그인 하셔야 댓글쓰기 가능합니다. 로그인 하시겠어요?");
            showAlertMessage();
            setConfirmAction(() => {
                hideAlert();
                navigate("/signUp");
            });
        }
    };
    //* 댓글 불러오기
    const fetchAllCommentView = async () => {
        // setCommentLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/viewComments/${itemId}`, {
                method: "GET",
                headers: {
                    "content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.group("My Group");
            console.log(data, "내가쓴댓글");
            console.groupEnd();
            console.table(data);
            setComments(data);
        }
        catch (error) {
            console.error(error);
            console.log("댓글 불러오기 실패");
        }
    };
    //* 댓글 제출시 실행될 함수
    const handleCommentSubmit = async (event) => {
        if (event != undefined) {
            event.preventDefault();
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/addcomment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${jwtDecodingData?.["token"]}`,
                },
                body: JSON.stringify({ text: commentText, postuuid: itemId }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            const data = await response.json();
            console.log(data, "댓글추가시 오는 데이터");
            setCommentText("");
            setComments((prevComments) => [
                ...prevComments,
                { userNickName: data.userNickName, text: commentText },
            ]); //* prevComments는 현재 댓글 , ...prevCommnets는 현재댓글을 그대로 복사, 오른쪽 객체는 복사한 댓글에 추가하고 싶은 값
        }
        catch (error) {
            console.log(error);
            console.error("Error fetching data:", error);
        }
    };
    //* 추천 눌렀을때 실행되는 함수
    const handleLike = async () => {
        if (!jwtDecodingData) {
            setAllertMessage("로그인 하셔야 좋아요  가능합니다. 로그인 하시겠어요?");
            showAlertMessage();
            setConfirmAction(() => {
                hideAlert();
                navigate("/signUp");
            });
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/like`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    Authorization: `${jwtDecodingData?.["token"]}`,
                },
                body: JSON.stringify({ postuuid: itemId }),
            });
            if (response.ok) {
                setTotalLikes(totalLikes + 1);
            }
            else {
                throw new Error("서버가 이상하다. 추천 로직을 검사하라");
            }
        }
        catch (error) {
            console.error("추천 에러가 발생했따리", "error");
        }
    };
    //* 내가 좋아요를 했는지 알려주는 함수(로그인을 해야 작동)
    const fetchBringdLikes = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/viewLikes/${itemId}`, {
                method: "GET",
                headers: {
                    Authorization: `${jwtDecodingData?.["token"]}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setHasLiked(data.userLiked > 0);
            }
            else {
                throw new Error("문제가있다.");
            }
        }
        catch (error) {
            console.log("좋아요 불러오기 실패");
        }
    };
    //* 좋아요 개수를 가져오는 함수
    const viewTotalLikes = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/totalViewLikes/${itemId}`);
            if (!response.ok) {
                console.log("좋아요를 가져오는데에 에러가 발생했습니다.");
            }
            const data = await response.json();
            setTotalLikes(data.totalLikes);
        }
        catch (error) {
            throw new Error("좋아요를 몇개 했는지 불러오는데 실패했습니다.");
        }
    };
    //* detail 페이지 진입시 실행
    (0, react_1.useEffect)(() => {
        fetchAllCommentView(); // 댓글 불러오기
        fetchBringdLikes(); //내가 좋아요 했는지 확인
        viewTotalLikes();
    }, []);
    return (<div className="detailPage">
      {post ? (<div className="detailPageContents">
          <div className="detailPage-headLine">
            <h1>제목:{post.title}</h1>
            <h2>작성자:{post.userNickName}</h2>
          </div>
          <div className="detailPage-renderImage">
            {post.photos.map((photo, index) => (<img key={index} src={photo} alt={`Photo ${index}`}/>))}
          </div>
        </div>) : (<p>게시물을 찾을 수 없습니다.</p>)}
      <div className="recommendationBox">
        <h3>추천수: {totalLikes}</h3>
        <button onClick={handleLike} disabled={hasLiked}>
          {hasLiked ? "좋아요됌" : "좋아요"}
        </button>
      </div>
      <div className="commentBox">
        <ul>
          {comments.map((comment, index) => (<li key={index}>
              <strong>{comment.userNickName}:</strong>{" "}
              {comment.text ? comment.text : "댓글이 없습니다."}
            </li>))}
        </ul>
        <form onSubmit={handleCommentSubmit}>
          <input type="text" value={commentText} // 현재 텍스트값과 상태의 동기화
     onChange={(e) => setCommentText(e.target.value)} // 이벤트핸들러의.이벤트가 발생한 요소 즉 인풋 .
     placeholder={jwtDecodingData !== null
            ? "댓글을 작성 하실수 있습니다."
            : "로그인 시 댓글작성 가능합니다."} onFocus={handleModal}></input>
          <button type="submit">제출</button>
        </form>
      </div>
    </div>);
};
exports.default = DetailComponent;
//# sourceMappingURL=detailPage.jsx.map