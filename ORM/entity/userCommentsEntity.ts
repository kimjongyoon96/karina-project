import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class userComment {
  @PrimaryGeneratedColumn()
  commentid: number;

  @Column({ type: "character", length: 255 })
  username: string;

  @Column({ type: "uuid" })
  postuuid: string;

  @Column({ type: "text" })
  text: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creationdate: Date;
}
