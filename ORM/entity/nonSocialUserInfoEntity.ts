import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { userpost } from "./userPostEntity";

@Entity()
export class nonSocialUserInfoData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, unique: true })
  userid: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  userPassWord: string;

  @Column({ type: "varchar", length: 255 })
  userNickName: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: true })
  useremail: string;

  @OneToMany(() => userpost, (post) => post.nonSocialUser)
  nonSocialPosts: userpost[];
}
