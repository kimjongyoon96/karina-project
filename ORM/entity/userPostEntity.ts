import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { userinfodata } from "./userInfoEntity"; // User 엔티티를 불러오는 가정입니다.
import { nonSocialUserInfoData } from "./nonSocialUserInfoEntity";
import { userComment } from "./userCommentsEntity";
import { userLike } from "./userLikeEntity";
//* @primaryGeneratoedColumn => 프라이머리 키
@Entity()
export class userpost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid" })
  uuid: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  menubar: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  title: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  photosumnail: string;

  @Column("text", { array: true, default: "{}" })
  photos: string[];

  @Column({ type: "varchar", length: 255, nullable: true })
  userNickName: string;
  @Column({ type: "int", nullable: true })
  postView: number;

  //* 소셜로그인 엔티티와 연결을 상징
  //* socialUser 필드는 userInfoData 엔티티의 인스턴스이다.
  @ManyToOne(() => userinfodata, (user) => user.socialPosts, {
    onDelete: "CASCADE",
  })
  socialUser: userinfodata;

  // 비소셜 로그인 사용자와의 관계 설정
  @ManyToOne(() => nonSocialUserInfoData, (user) => user.nonSocialPosts)
  nonSocialUser: nonSocialUserInfoData;

  //* 코멘트 엔티티와 연결
  @OneToMany(() => userComment, (comment) => comment.user)
  comments: userComment[];
  //* 라이크 엔티티와 연결
  @OneToMany(() => userLike, (like) => like.post)
  like: userLike[];
}
