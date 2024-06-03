import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { userInfoData } from "./userInfoEntity";
import { userPost } from "./userPostEntity";

@Entity()
export class userComment {
  @PrimaryGeneratedColumn()
  commentid: number;

  @Column({ type: "character", length: 255 })
  username: string;
  @Column({ type: "varchar", nullable: true })
  userId: string;
  @Column({ type: "character", length: 255, nullable: true })
  userNickName: string;
  @Column({ type: "uuid" })
  postuuid: string;

  @Column({ type: "text" })
  text: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creationdate: Date;
  //* 사용자 엔티티와 연결
  @ManyToOne(() => userInfoData, (user) => user.comments)
  user: userInfoData;
  //* 게시물 엔티티와 연결
  @ManyToOne(() => userPost, (post) => post.comments)
  post: userPost;
}
