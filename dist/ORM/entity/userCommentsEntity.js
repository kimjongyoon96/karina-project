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
exports.userComment = void 0;
const typeorm_1 = require("typeorm");
const userInfoEntity_1 = require("./userInfoEntity");
const userPostEntity_1 = require("./userPostEntity");
let userComment = class userComment {
    commentid;
    username;
    userId;
    userNickName;
    postuuid;
    text;
    creationdate;
    //* 사용자 엔티티와 연결
    user;
    //* 게시물 엔티티와 연결
    post;
};
exports.userComment = userComment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], userComment.prototype, "commentid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "character", length: 255 }),
    __metadata("design:type", String)
], userComment.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], userComment.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "character", length: 255, nullable: true }),
    __metadata("design:type", String)
], userComment.prototype, "userNickName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], userComment.prototype, "postuuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], userComment.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], userComment.prototype, "creationdate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userInfoEntity_1.userInfoData, (user) => user.comments),
    __metadata("design:type", userInfoEntity_1.userInfoData)
], userComment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userPostEntity_1.userPost, (post) => post.comments),
    __metadata("design:type", userPostEntity_1.userPost)
], userComment.prototype, "post", void 0);
exports.userComment = userComment = __decorate([
    (0, typeorm_1.Entity)()
], userComment);
