"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validNickName = (nickName) => {
    const regex = /^[\uac00-\ud7a3]{1,6}$/;
    return regex.test(nickName);
};
exports.default = validNickName;
//# sourceMappingURL=validNick.jsx.map