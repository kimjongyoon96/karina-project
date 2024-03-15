import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { userPost } from "./userPostEntity";

@Entity()
export class userInfoData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  username: string;

  @Column({ type: "varchar", length: 255, unique: true })
  useremail: string;

  @OneToMany(() => userPost, (userPost) => userPost.user_id)
  karinas: userPost[];
}
