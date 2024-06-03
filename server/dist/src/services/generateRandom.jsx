"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateRandomNumber = () => {
    const min = 100000;
    const max = 999999;
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomCode.toString();
};
exports.default = generateRandomNumber;
//# sourceMappingURL=generateRandom.jsx.map