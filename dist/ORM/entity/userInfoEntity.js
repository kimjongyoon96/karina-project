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
exports.userInfoData = void 0;
const typeorm_1 = require("typeorm");
const userPostEntity_1 = require("./userPostEntity");
const userCommentsEntity_1 = require("./userCommentsEntity");
const userLikeEntity_1 = require("./userLikeEntity");
//* unique:true => 중복을 허용하지 않겠다.
let userInfoData = class userInfoData {
    id;
    username;
    //* 논소셜 전용, 소셜은 Id 안받음
    userId;
    useremail;
    userNickName;
    userPassWord;
    //* //* social || non 구별
    loginType;
    //* 게시물 엔티티와 연결
    //* socialPosts 필드는 userPost 엔티티의 배열이다.
    socialPosts;
    //*댓글 엔티티와 연결
    comments;
    //*좋아요 엔티티와 연결
    likes;
};
exports.userInfoData = userInfoData;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], userInfoData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], userInfoData.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], userInfoData.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], userInfoData.prototype, "useremail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], userInfoData.prototype, "userNickName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], userInfoData.prototype, "userPassWord", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", default: false }),
    __metadata("design:type", String)
], userInfoData.prototype, "loginType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userPostEntity_1.userPost, (post) => post.socialUser),
    __metadata("design:type", Array)
], userInfoData.prototype, "socialPosts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userCommentsEntity_1.userComment, (comment) => comment.user),
    __metadata("design:type", Array)
], userInfoData.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userLikeEntity_1.userLike, (likes) => likes.user),
    __metadata("design:type", Array)
], userInfoData.prototype, "likes", void 0);
exports.userInfoData = userInfoData = __decorate([
    (0, typeorm_1.Entity)()
], userInfoData);
