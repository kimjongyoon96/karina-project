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
exports.userPost = void 0;
const typeorm_1 = require("typeorm");
const userInfoEntity_1 = require("./userInfoEntity"); // User 엔티티를 불러오는 가정입니다.
const nonSocialUserInfoEntity_1 = require("./nonSocialUserInfoEntity");
const userCommentsEntity_1 = require("./userCommentsEntity");
const userLikeEntity_1 = require("./userLikeEntity");
//* @primaryGeneratoedColumn => 프라이머리 키
let userPost = class userPost {
    id;
    uuid;
    menubar;
    title;
    photosumnail;
    photos;
    userNickName;
    //* 소셜로그인 엔티티와 연결을 상징
    //* socialUser 필드는 userInfoData 엔티티의 인스턴스이다.
    socialUser;
    // 비소셜 로그인 사용자와의 관계 설정
    nonSocialUser;
    //* 코멘트 엔티티와 연결
    comments;
    //* 라이크 엔티티와 연결
    like;
};
exports.userPost = userPost;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], userPost.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], userPost.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], userPost.prototype, "menubar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], userPost.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], userPost.prototype, "photosumnail", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, default: "{}" }),
    __metadata("design:type", Array)
], userPost.prototype, "photos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], userPost.prototype, "userNickName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userInfoEntity_1.userInfoData, (user) => user.socialPosts),
    __metadata("design:type", userInfoEntity_1.userInfoData)
], userPost.prototype, "socialUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nonSocialUserInfoEntity_1.nonSocialUserInfoData, (user) => user.nonSocialPosts),
    __metadata("design:type", nonSocialUserInfoEntity_1.nonSocialUserInfoData)
], userPost.prototype, "nonSocialUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userCommentsEntity_1.userComment, (comment) => comment.user),
    __metadata("design:type", Array)
], userPost.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userLikeEntity_1.userLike, (like) => like.post),
    __metadata("design:type", Array)
], userPost.prototype, "like", void 0);
exports.userPost = userPost = __decorate([
    (0, typeorm_1.Entity)()
], userPost);
//# sourceMappingURL=userPostEntity.js.map