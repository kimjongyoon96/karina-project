import { useNavigate } from "react-router-dom";
import useAuthStore from "../../JustAnd/GlobalState";
import e, { response } from "express";
import validUserPw from "../../services/vaildws";
import React, { useState, useEffect } from "react";

interface userData {
  username: string;
  useremail: string;
  userNickName: string;
  userPassWord: string;
}

const MyInfoUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { jwtDecodingData } = useAuthStore((state) => state.jwtGlobal);
  const [userData, setUserData] = useState<userData | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [desabled, setDesabled] = useState(false);
  // 개별 상태 관리
  const [username, setUserName] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [userNickName, setUserNickName] = useState("");
  const [userPassWord, setUserPw] = useState("");
  const [userId, setUserId] = useState("");
  const [loginType, setLoginType] = useState("");
  console.log(loginType);

  // 필드별 편집 가능 상태 관리
  const [editableFields, setEditableFields] = useState({
    username: false,
    useremail: false,
    userNickName: false,
    userPassWord: false,
    userId: false,
  });
  const { setAllertMessage, showAlertMessage, setConfirmAction, hideAlert } =
    useAuthStore((state) => state.alertState);
  const { deleteBollean, setDeleteBollean } = useAuthStore(
    (state) => state.UserDeleteRight
  );
  console.log("회원탈퇴를 누르면 true", deleteBollean);
  useEffect(() => {
    if (jwtDecodingData) {
      console.log("마이페이지 수정에서의 JWT값", jwtDecodingData?.["token"]);
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/usersInfo`,
            {
              method: "POST",
              headers: {
                authorization: `${jwtDecodingData?.["token"]}`,
                "Content-Type": "application/json",
              },
            }
          );
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
        } catch (error) {
          console.error(error, "내정보 수정을 위한 업데이트 입니다.");
        }
      };
      fetchData();
    }
  }, [jwtDecodingData]);
  useEffect(() => {
    console.log("상태 변경:", {
      username,
      useremail,
      userNickName,
      userPassWord,
      userId,
      loginType,
    });
  }, [username, useremail, userNickName, userPassWord, userId, loginType]);
  const toggleEditable = (field: keyof typeof editableFields) => () => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [field]: !prevFields[field],
    }));
  };
  const handleDisabled = (loginType: string) => {
    if (loginType === "false") {
      setDesabled(true); // 소셜로그인
    }
  };
  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData = {
      useremail,
      userNickName,
      userPassWord,
      userId,
      username,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/usersPatch`,
        {
          method: "PATCH",
          headers: {
            authorization: `${jwtDecodingData?.["token"]}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (response.ok) {
        setIsUpdate(true);
        const updatedUserData = await response.json();
        setUserData(updatedUserData);
        alert("업데이트에 성공햇습니다.");
      } else {
        console.error("업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("업데이트 유저에 에러가 발생했습니다.", error);
    }
  };
  const handleDeleteAllert = () => {
    setAllertMessage(
      "탈퇴하시면 회원님의 모든 게시물과 댓글이 삭제됩니다.삭제하시겠어요?"
    );
    showAlertMessage();
    setConfirmAction(() => {
      hideAlert();
      handleDeleteUser();
    });
  };
  const handleDeleteUser = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/deleteUserInfo`,
        {
          method: "DELETE",
          headers: {
            authorization: `${jwtDecodingData?.["token"]}`,
          },
        }
      );
      if (!response.ok) {
        console.error("유저 정보 삭제하는데 실패");
      }
      const data = await response.json();
      if (data.status === 200) {
        setDeleteBollean(true);
        navigate("/");
      }
      console.log(data);
    } catch (error) {
      throw new Error("유저 삭제하는데 실패했습니다.");
    }
  };
  //* desebled ===ture?. 소셜로그인
  return (
    <main className="user-info-update-box">
      <div className="user-info-header">
        <h1>내 정보 수정하기</h1>
        <button
          className="user-info-delete-btn"
          onClick={() => {
            handleDeleteAllert();
          }}
        >
          회원탈퇴
        </button>
      </div>

      <div className="social-user-update-box">
        <form onSubmit={handleDeleteAllert}>
          {desabled && (
            <>
              <div className="input-group">
                <h3>유저 아이디</h3>
                <input
                  type="text"
                  value={userId}
                  onChange={handleInputChange(setUserId)}
                  disabled={!editableFields.userId}
                />
                <button type="button" onClick={toggleEditable("userId")}>
                  {editableFields.userId ? "확인" : "수정하기"}
                </button>
              </div>
            </>
          )}
          {desabled && (
            <div className="input-group">
              <h3>유저 이름</h3>
              <input
                type="text"
                value={username}
                onChange={handleInputChange(setUserName)}
                disabled={!editableFields.username}
              />
              <button type="button" onClick={toggleEditable("username")}>
                {editableFields.username ? "확인" : "수정하기"}
              </button>
            </div>
          )}
          {desabled && (
            <div className="input-group">
              <h3>이메일</h3>
              <input
                type="email"
                value={useremail}
                onChange={handleInputChange(setUserEmail)}
                disabled={!editableFields.useremail}
              />
              <button type="button" onClick={toggleEditable("useremail")}>
                {editableFields.useremail ? "확인" : "수정하기"}
              </button>
            </div>
          )}
          <div className="input-group">
            <h3>닉네임</h3>
            <input
              type="text"
              value={userNickName}
              onChange={handleInputChange(setUserNickName)}
              disabled={!editableFields.userNickName}
            />
            <button type="button" onClick={toggleEditable("userNickName")}>
              {editableFields.userNickName ? "확인" : "수정하기"}
            </button>
          </div>
          {desabled && (
            <>
              <div className="input-group">
                <h3>비밀번호</h3>
                <input
                  type="password"
                  value={userPassWord}
                  onChange={handleInputChange(setUserPw)}
                  disabled={!editableFields.userPassWord}
                />
                <button type="button" onClick={toggleEditable("userPassWord")}>
                  {editableFields.userPassWord ? "확인" : "수정하기"}
                </button>
              </div>
            </>
          )}

          <button type="submit" className="submit-btn">
            회원정보 수정하기
          </button>
        </form>
      </div>
    </main>
  );
};

//* disabled => 수정하기 누르면 알람 컴포넌트 생성, ok 누르면 disabled
//* useCase => 1. 사용자는 이메일 인증으로 완료 후 이 컴포넌트가 마운트가 된다.
// 2. 사용자는 현재 로그인한 DB데이터와 일치하는 데이터를 즉각적으로 렌더링 받는다.
// 3. 사용자는 현재 본인이 수정하고 싶은 요소를 수정할수 있으며, 이를 제출할수있다.
///4. 예를들어서, 사용자가 닉네임을 수정한다고 한다면, 닉네임 input 태그의 Placeholder 를 지우고, 본인이 원하는 닉네임을 입력후, 수정하기 버튼을 누르면 상태에 저장된다.
// 5. 최종적으로 회원정보 수정하기 버튼을 누르면, 서버로 변경된 데이터, 변경하지 않은 데이터가  혼합된 값이 온다. (body에 저장될 것이며, Patch 요청이다.)
// 6. 변경된 데이터는 isDataUpdate 상태의 값을 true로 바꾼다
// 7. 자연스럽게 변경이 되지 않은 데이터는 isDataUpdate는 false이다.

export default MyInfoUpdate;
