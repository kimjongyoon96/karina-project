import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { userPost } from "./userPostEntity";
import { userComment } from "./userCommentsEntity";
import { userLike } from "./userLikeEntity";
//* unique:true => 중복을 허용하지 않겠다.
@Entity()
export class userInfoData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  username: string;

  @Column({ type: "varchar", length: 255, unique: true })
  useremail: string;

  @Column({ type: "varchar", length: 255 })
  userNickName: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  userPassWord: string;
  //* //* social || non 구별
  @Column({ type: "boolean", default: false })
  isSocial: boolean;
  //* 게시물 엔티티와 연결
  @OneToMany(() => userPost, (post) => post.socialUser)
  socialPosts: userPost[];
  //*댓글 엔티티와 연결
  @OneToMany(() => userComment, (comment) => comment.user)
  comments: userComment[];
  //*좋아요 엔티티와 연결
  @OneToMany(() => userLike, (likes) => likes.user)
  likes: userLike[];
}
