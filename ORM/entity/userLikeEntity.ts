import { userInfo } from "os";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { userInfoData } from "./userInfoEntity";
import { userPost } from "./userPostEntity";

@Entity()
export class userLike {
  @PrimaryGeneratedColumn()
  likeid: number;

  @Column({ type: "varchar", length: 255 })
  username: string;
  @Column({ type: "varchar", nullable: true })
  userId: string;
  @Column("uuid")
  postid: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creationdate: Date;

  //* 사용자 엔티티와 연결
  @ManyToOne(() => userInfoData, (user) => user.likes)
  user: userInfoData;
  //* 게시물 엔티티와 연결
  @ManyToOne(() => userPost, (post) => post.like)
  post: userPost;
}
