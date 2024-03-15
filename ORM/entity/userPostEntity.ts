import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { userInfoData } from "./userInfoEntity"; // User 엔티티를 불러오는 가정입니다.

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

  @ManyToOne(() => userInfoData, (user) => user.karinas)
  @Column({ nullable: true })
  user_id: number;
}
