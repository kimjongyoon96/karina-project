import { userInfo } from "os";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { userinfodata } from "./userInfoEntity";
import { userpost } from "./userPostEntity";

@Entity()
export class userLike {
  @PrimaryGeneratedColumn()
  likeid: number;
  @Column({ type: "varchar", length: 255 })
  username: string;
  @Column({ type: "varchar", nullable: true })
  userLoginId: string;
  @Column("uuid")
  postid: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creationdate: Date;

  //* 사용자 엔티티와 연결
  @ManyToOne(() => userinfodata, (user) => user.likes)
  user: userinfodata;
  //* 게시물 엔티티와 연결
  @ManyToOne(() => userpost, (post) => post.like)
  post: userpost;
}
