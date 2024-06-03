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
const react_2 = require("react");
const react_router_dom_1 = require("react-router-dom");
require("./myPage.css");
const warningDelete_1 = __importDefault(require("../customComponent/deleteModalForMyPage/warningDelete"));
const GlobalState_1 = __importDefault(require("../../JustAnd/GlobalState"));
const MyPage = () => {
    //* 내가 쓴글, 내가 쓴 댓글, 내가 좋아요 한 게시물
    //* 내 정보 수정 => 닉네임 수정
    const [bringData, setData] = (0, react_2.useState)(null);
    const [bringCommnets, setBringComments] = (0, react_2.useState)(null);
    const [bringWrites, setBringWrites] = (0, react_2.useState)(null);
    const [bringLikes, setBringLikes] = (0, react_2.useState)(null);
    const [pageNumber, setPageNumber] = (0, react_2.useState)("");
    const [userinfoData, setUserInfoData] = (0, react_2.useState)("");
    const [activeSection, setActiveSection] = (0, react_2.useState)("");
    const [isModalOpen, setIsModalOpen] = (0, react_2.useState)(false); // default "닫힘"
    const { jwtDecodingData, setJwtDecodingData } = (0, GlobalState_1.default)((state) => state.jwtGlobal);
    const [userName, setUserName] = (0, react_2.useState)("");
    console.log("마이페이지에서의 값", jwtDecodingData);
    console.log(bringCommnets);
    console.log(bringWrites);
    console.log(bringLikes);
    console.table(bringLikes);
    console.log(userinfoData);
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            if (jwtDecodingData) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/usersData`, {
                        headers: {
                            Authorization: `${jwtDecodingData?.["token"]}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error("에러발생 비상상ㅇ태");
                    }
                    const data = await response.json();
                    setUserInfoData(data.identifier);
                    console.log(data, "서버에서 준 유저JWT 해독 정보");
                }
                catch (error) {
                    console.error(error, "에러가 발생했습니다.");
                }
            }
        };
        fetchData();
    }, [jwtDecodingData]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    //* 내정보 수정 누를시 컴포넌트 이동
    const handleNavigateMyInfo = () => {
        navigate("/UpdateProfile");
    };
    //* 내가쓴글 클릭했을때 나오는 함수
    const handleMyWriteArticle = () => {
        console.log("마이게시글");
        fetchData("myWrite", 1, 8);
        setActiveSection("myWriteUl");
    };
    //* 내가쓴 댓글 나오게 하는 함수
    const handleMyWriteComments = () => {
        fetchData("myComments", 1, 8);
        setActiveSection("myCommentsUl");
    };
    //* 내가 좋아요 누른 게시물
    const handleMyLikeArticle = () => {
        fetchData("myLikes", 1, 8);
        setActiveSection("myLikesUl");
    };
    //* 삭제 눌렀을때 실행되는 함수
    const handleDeleteType = async () => {
        setIsModalOpen(true);
    };
    const handleModalConfirm = async (deleteType, postid) => {
        await fetchDeleteData(deleteType, postid);
    };
    const handleModalCancle = () => {
        setIsModalOpen(false);
    };
    //* 클릭할때마다 바뀌는 data에 대한 useEffect 훅
    (0, react_1.useEffect)(() => {
        if (bringData?.commnets && bringData.commnets.length > 0) {
            setBringComments(bringData);
        }
        else if (bringData?.likes && bringData.likes.length > 0) {
            setBringLikes(bringData);
        }
        else {
            setBringWrites(bringData);
        }
    }, [bringData]); // 댓글, 게시글, 좋아요
    const fetchData = async (type, page, limit) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users?selected=${type}&page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `${jwtDecodingData?.["token"]}`,
                },
            });
            if (!response.ok) {
                throw new Error("나의 정보 데이터가 이상합니다.");
            }
            const data = await response.json();
            setData(data);
        }
        catch (error) {
            console.error(error, "나의 정보 로직에 문제가있습니다.");
        }
    };
    const fetchDeleteData = async (deleteType, postid) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/deleteMyPage?selected=${deleteType}&infoSelected=${postid}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const result = await response.json();
            }
            else {
                console.error("삭제하는데 실패했습니다.");
            }
        }
        catch (error) {
            throw new Error("삭제로직에 문제가 있습니다.");
        }
    };
    //* 조건부 렌더링
    //*
    return (<main className="mypage-box">
      <div className="mypage-signature">
        <h1>my page 입니다.</h1>
      </div>
      <section className="mypage-header">
        <div className="mypage-client-nickName">
          <h2>안녕하세요 {userinfoData}님</h2>
        </div>
        <div className="mypage-navigation-myinfo">
          <p onClick={handleNavigateMyInfo}>내정보 수정하기</p>
        </div>
      </section>
      <section className="mypage-select-uitag">
        <div className="mypage-container">
          <ul onClick={handleMyWriteArticle}>내가 쓴 게시물</ul>

          <ul onClick={handleMyWriteComments}>내가 쓴 댓글 </ul>
          <ul onClick={handleMyLikeArticle}>내가 좋아요 한 글</ul>
        </div>
      </section>
      <section className="mypage-selected-render">
        <div className="mypage-render-box-myWrite">
          {activeSection === "myWriteUl" && bringWrites
            ? bringWrites.posts?.slice(0, 8).map((post) => (<div className="post-container" key={post.id}>
                  <div className="post-header">
                    <h2>제목:{post.title}</h2>
                    <h2>카테고리:{post.menubar}</h2>
                  </div>
                  <div className="post-body">
                    <img src={post.photosumnail}/>

                    <button className="delete-btn-myWrite" onClick={() => handleDeleteType()}>
                      삭제
                    </button>
                  </div>
                  {isModalOpen && (<warningDelete_1.default message="이 댓글을 삭제하겟습니까?" onConfirm={() => handleModalConfirm("myWrite", post.id)} onCancel={handleModalCancle}/>)}
                </div>))
            : "어떠한 게시글도 없다."}
        </div>

        <div className="mypage-render-box-myComments">
          {activeSection === "myCommentsUl" &&
            bringCommnets?.commnets &&
            bringCommnets.commnets.length > 0
            ? bringCommnets.commnets.slice(0, 8).map((comment) => (<div>
                  <h2>{comment.text}</h2>
                  <h2>{comment.userNickName}</h2>
                  <h3>{comment.commentid}</h3>
                  <button className="delete-btn-myComments" onClick={() => handleDeleteType()}>
                    삭제
                  </button>
                  {isModalOpen && (<warningDelete_1.default message="이 댓글을 삭제하겟습니까?" onConfirm={() => handleModalConfirm("myComments", comment.commentid)} onCancel={handleModalCancle}/>)}
                </div>))
            : "어떠한 댓글도 없습니다."}
        </div>

        <div className="mypage-render-box-myLikes">
          {activeSection === "myLikesUl" &&
            bringLikes?.likes &&
            bringLikes.likes.length > 0
            ? bringLikes.likes.slice(0, 8).map((like) => (<div key={like.likeid}>
                  <h2>{like.username}</h2>
                  <div>{like.postid}</div>
                  <div>{like.creationdate}</div>
                </div>))
            : "어떠한 좋아요도 안했다."}
        </div>
      </section>
    </main>);
};
exports.default = MyPage;
//# sourceMappingURL=myPage.jsx.map