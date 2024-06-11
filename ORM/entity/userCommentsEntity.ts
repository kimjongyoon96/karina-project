import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { userinfodata } from "./userInfoEntity";
import { userpost } from "./userPostEntity";

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
  @ManyToOne(() => userinfodata, (user) => user.comments)
  user: userinfodata;
  //* 게시물 엔티티와 연결
  @ManyToOne(() => userpost, (post) => post.comments)
  post: userpost;
}
