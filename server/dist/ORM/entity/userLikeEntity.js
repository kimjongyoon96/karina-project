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
exports.userLike = void 0;
const typeorm_1 = require("typeorm");
const userInfoEntity_1 = require("./userInfoEntity");
const userPostEntity_1 = require("./userPostEntity");
let userLike = class userLike {
    likeid;
    username;
    userId;
    postid;
    creationdate;
    //* 사용자 엔티티와 연결
    user;
    //* 게시물 엔티티와 연결
    post;
};
exports.userLike = userLike;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], userLike.prototype, "likeid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], userLike.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], userLike.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], userLike.prototype, "postid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], userLike.prototype, "creationdate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userInfoEntity_1.userInfoData, (user) => user.likes),
    __metadata("design:type", userInfoEntity_1.userInfoData)
], userLike.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userPostEntity_1.userPost, (post) => post.like),
    __metadata("design:type", userPostEntity_1.userPost)
], userLike.prototype, "post", void 0);
exports.userLike = userLike = __decorate([
    (0, typeorm_1.Entity)()
], userLike);
//# sourceMappingURL=userLikeEntity.js.map