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
const GlobalState_1 = __importDefault(require("../../JustAnd/GlobalState"));
const react_1 = __importStar(require("react"));
const MyInfoUpdate = () => {
    const { jwtDecodingData } = (0, GlobalState_1.default)((state) => state.jwtGlobal);
    const [userData, setUserData] = (0, react_1.useState)(null);
    const [isUpdate, setIsUpdate] = (0, react_1.useState)(false);
    const [desabled, setDesabled] = (0, react_1.useState)(false);
    // 개별 상태 관리
    const [username, setUserName] = (0, react_1.useState)("");
    const [useremail, setUserEmail] = (0, react_1.useState)("");
    const [userNickName, setUserNickName] = (0, react_1.useState)("");
    const [userPassWord, setUserPw] = (0, react_1.useState)("");
    const [userId, setUserId] = (0, react_1.useState)("");
    const [loginType, setLoginType] = (0, react_1.useState)("");
    console.log(loginType);
    // 필드별 편집 가능 상태 관리
    const [editableFields, setEditableFields] = (0, react_1.useState)({
        username: false,
        useremail: false,
        userNickName: false,
        userPassWord: false,
        userId: false,
    });
    (0, react_1.useEffect)(() => {
        if (jwtDecodingData) {
            console.log("마이페이지 수정에서의 JWT값", jwtDecodingData?.["token"]);
            const fetchData = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/usersInfo`, {
                        method: "POST",
                        headers: {
                            authorization: `${jwtDecodingData?.["token"]}`,
                            "Content-Type": "application/json",
                        },
                    });
                    const data = await response.json(); //* userInfo entity data
                    console.log("내정보 수정 data:", data);
                    if (typeof data === "object" && data !== null) {
                        setUserData(data);
                        setUserName(data.username);
                        setUserEmail(data.useremail);
                        setUserNickName(data.userNickName);
                        setUserPw(data.userPassWord);
                        setUserId(data.userId);
                        setLoginType(data.loginType);
                        handleDisabled(data.logintype);
                    }
                }
                catch (error) {
                    console.error(error, "내정보 수정을 위한 업데이트 입니다.");
                }
            };
            fetchData();
        }
    }, [jwtDecodingData]);
    (0, react_1.useEffect)(() => {
        console.log("상태 변경:", {
            username,
            useremail,
            userNickName,
            userPassWord,
            userId,
            loginType,
        });
    }, [username, useremail, userNickName, userPassWord, userId, loginType]);
    const toggleEditable = (field) => () => {
        setEditableFields((prevFields) => ({
            ...prevFields,
            [field]: !prevFields[field],
        }));
    };
    const handleDisabled = (loginType) => {
        if (loginType === "false") {
            setDesabled(true); // 소셜로그인
        }
    };
    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            useremail,
            userNickName,
            userPassWord,
            userId,
            username,
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/usersPatch`, {
                method: "PATCH",
                headers: {
                    authorization: `${jwtDecodingData?.["token"]}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (response.ok) {
                setIsUpdate(true);
                const updatedUserData = await response.json();
                setUserData(updatedUserData);
                alert("업데이트에 성공햇습니다.");
            }
            else {
                console.error("업데이트에 실패했습니다.");
            }
        }
        catch (error) {
            console.error("업데이트 유저에 에러가 발생했습니다.", error);
        }
    };
    return (<main className="user-info-update-box">
      <h1>내 정보 수정하기</h1>
      <div className="social-user-update-box">
        <form onSubmit={handleSubmit}>
          {desabled && (<>
              <div className="input-group">
                <h3>유저 아이디</h3>
                <input type="text" value={userId} onChange={handleInputChange(setUserId)} disabled={!editableFields.userId}/>
                <button type="button" onClick={toggleEditable("userId")}>
                  {editableFields.userId ? "확인" : "수정하기"}
                </button>
              </div>
            </>)}
          <div className="input-group">
            <h3>유저 이름</h3>
            <input type="text" value={username} onChange={handleInputChange(setUserName)} disabled={!editableFields.username}/>
            <button type="button" onClick={toggleEditable("username")}>
              {editableFields.username ? "확인" : "수정하기"}
            </button>
          </div>
          <div className="input-group">
            <h3>이메일</h3>
            <input type="email" value={useremail} onChange={handleInputChange(setUserEmail)} disabled={!editableFields.useremail}/>
            <button type="button" onClick={toggleEditable("useremail")}>
              {editableFields.useremail ? "확인" : "수정하기"}
            </button>
          </div>
          <div className="input-group">
            <h3>닉네임</h3>
            <input type="text" value={userNickName} onChange={handleInputChange(setUserNickName)} disabled={!editableFields.userNickName}/>
            <button type="button" onClick={toggleEditable("userNickName")}>
              {editableFields.userNickName ? "확인" : "수정하기"}
            </button>
          </div>
          {desabled && (<>
              <div className="input-group">
                <h3>비밀번호</h3>
                <input type="password" value={userPassWord} onChange={handleInputChange(setUserPw)} disabled={!editableFields.userPassWord}/>
                <button type="button" onClick={toggleEditable("userPassWord")}>
                  {editableFields.userPassWord ? "확인" : "수정하기"}
                </button>
              </div>
            </>)}

          <button type="submit" className="submit-btn">
            회원정보 수정하기
          </button>
        </form>
      </div>
    </main>);
};
//* disabled => 수정하기 누르면 알람 컴포넌트 생성, ok 누르면 disabled
//* useCase => 1. 사용자는 이메일 인증으로 완료 후 이 컴포넌트가 마운트가 된다.
// 2. 사용자는 현재 로그인한 DB데이터와 일치하는 데이터를 즉각적으로 렌더링 받는다.
// 3. 사용자는 현재 본인이 수정하고 싶은 요소를 수정할수 있으며, 이를 제출할수있다.
///4. 예를들어서, 사용자가 닉네임을 수정한다고 한다면, 닉네임 input 태그의 Placeholder 를 지우고, 본인이 원하는 닉네임을 입력후, 수정하기 버튼을 누르면 상태에 저장된다.
// 5. 최종적으로 회원정보 수정하기 버튼을 누르면, 서버로 변경된 데이터, 변경하지 않은 데이터가  혼합된 값이 온다. (body에 저장될 것이며, Patch 요청이다.)
// 6. 변경된 데이터는 isDataUpdate 상태의 값을 true로 바꾼다
// 7. 자연스럽게 변경이 되지 않은 데이터는 isDataUpdate는 false이다.
exports.default = MyInfoUpdate;
//# sourceMappingURL=myInfoUpdate.jsx.map