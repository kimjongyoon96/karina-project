import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class userLike {
  @PrimaryGeneratedColumn()
  likeid: number;

  @Column({ type: "varchar", length: 255 })
  username: string;

  @Column("uuid")
  postid: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creationdate: Date;
}
