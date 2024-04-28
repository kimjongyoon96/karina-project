import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { userInfoData } from "./userInfoEntity"; // User 엔티티를 불러오는 가정입니다.
import { nonSocialUserInfoData } from "./nonSocialUserInfoEntity";
//* @primaryGeneratoedColumn => 프라이머리 키
@Entity()
export class userPost {
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
  @ManyToOne(() => userInfoData, (user) => user.socialPosts)
  socialUser: userInfoData;

  // 비소셜 로그인 사용자와의 관계 설정
  @ManyToOne(() => nonSocialUserInfoData, (user) => user.nonSocialPosts)
  nonSocialUser: nonSocialUserInfoData;
}
