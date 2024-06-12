const validNickName = (nickName) => {
  const regex = /^[\uac00-\ud7a3]{1,6}$/;
  return regex.test(nickName);
};

export default validNickName;
