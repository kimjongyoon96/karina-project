import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { userPost } from "./userPostEntity";
import { userComment } from "./userCommentsEntity";
import { userLike } from "./userLikeEntity";
//* unique:true => 중복을 허용하지 않겠다.
@Entity()
export class userInfoData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  username: string;
  //* 논소셜 전용, 소셜은 Id 안받음
  @Column({ type: "varchar", length: 255, nullable: true })
  userId: string;
  @Column({ type: "varchar", length: 255, nullable: true })
  useremail: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  userNickName: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  userPassWord: string;
  //* //* social || non 구별

  @Column({ type: "varchar", default: false })
  loginType: string;
  //* 게시물 엔티티와 연결
  //* socialPosts 필드는 userPost 엔티티의 배열이다.
  @OneToMany(() => userPost, (post) => post.socialUser)
  socialPosts: userPost[];
  //*댓글 엔티티와 연결
  @OneToMany(() => userComment, (comment) => comment.user)
  comments: userComment[];
  //*좋아요 엔티티와 연결
  @OneToMany(() => userLike, (likes) => likes.user)
  likes: userLike[];
}
