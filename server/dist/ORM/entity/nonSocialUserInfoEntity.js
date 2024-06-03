"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonSocialUserInfoData = void 0;
const typeorm_1 = require("typeorm");
const userPostEntity_1 = require("./userPostEntity");
let nonSocialUserInfoData = class nonSocialUserInfoData {
    id;
    userid;
    userPassWord;
    userNickName;
    useremail;
    nonSocialPosts;
};
exports.nonSocialUserInfoData = nonSocialUserInfoData;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], nonSocialUserInfoData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, unique: true }),
    __metadata("design:type", String)
], nonSocialUserInfoData.prototype, "userid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], nonSocialUserInfoData.prototype, "userPassWord", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], nonSocialUserInfoData.prototype, "userNickName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, unique: true, nullable: true }),
    __metadata("design:type", String)
], nonSocialUserInfoData.prototype, "useremail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userPostEntity_1.userPost, (post) => post.nonSocialUser),
    __metadata("design:type", Array)
], nonSocialUserInfoData.prototype, "nonSocialPosts", void 0);
exports.nonSocialUserInfoData = nonSocialUserInfoData = __decorate([
    (0, typeorm_1.Entity)()
], nonSocialUserInfoData);
//# sourceMappingURL=nonSocialUserInfoEntity.js.map