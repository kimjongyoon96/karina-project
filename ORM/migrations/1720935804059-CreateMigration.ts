import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMigration1720935804059 implements MigrationInterface {
    name = 'CreateMigration1720935804059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_comment" ("commentid" SERIAL NOT NULL, "username" character(255) NOT NULL, "userId" integer, "userNickName" character(255), "postuuid" uuid NOT NULL, "text" text NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "postId" integer, CONSTRAINT "PK_7dd36ba9db14087573478110a12" PRIMARY KEY ("commentid"))`);
        await queryRunner.query(`CREATE TABLE "user_like" ("likeid" SERIAL NOT NULL, "username" character varying(255) NOT NULL, "userLoginId" character varying, "postid" uuid NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "postId" integer, CONSTRAINT "PK_a9b51477689050c21dfdd7e1718" PRIMARY KEY ("likeid"))`);
        await queryRunner.query(`CREATE TABLE "userinfodata" ("id" SERIAL NOT NULL, "username" character varying(255), "userId" character varying(255), "useremail" character varying(255), "userNickName" character varying(255), "userPassWord" character varying(255), "loginType" character varying NOT NULL DEFAULT false, "selectedStar" character varying NOT NULL DEFAULT 'jangwonyoung', CONSTRAINT "PK_ce20abbb1c0d88e110277fd9adc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "non_social_user_info_data" ("id" SERIAL NOT NULL, "userid" character varying(255) NOT NULL, "userPassWord" character varying(255), "userNickName" character varying(255) NOT NULL, "useremail" character varying(255), CONSTRAINT "UQ_f32b238debf5a6b654de3baf7f6" UNIQUE ("userid"), CONSTRAINT "UQ_b0bb91c336335f366d9bda4605e" UNIQUE ("useremail"), CONSTRAINT "PK_04600704d749449f068b707fd3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userpost" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "menubar" character varying(255), "title" character varying(255), "photosumnail" character varying(255), "photos" text array NOT NULL DEFAULT '{}', "userNickName" character varying(255), "postView" integer, "socialUserId" integer, "nonSocialUserId" integer, CONSTRAINT "PK_9fb6ab83991c7c763ad8187120b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_comment" ADD CONSTRAINT "FK_ebd475b57b16b0039934dc31a14" FOREIGN KEY ("userId") REFERENCES "userinfodata"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_comment" ADD CONSTRAINT "FK_0de594f170103908723318aea69" FOREIGN KEY ("postId") REFERENCES "userpost"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_like" ADD CONSTRAINT "FK_cf2ee7fd77d84d8ae1bfdb3b8db" FOREIGN KEY ("userId") REFERENCES "userinfodata"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_like" ADD CONSTRAINT "FK_91f2c6ac468e0b68fa2ac0a11ae" FOREIGN KEY ("postId") REFERENCES "userpost"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userpost" ADD CONSTRAINT "FK_8033b38ef8c57610a5b0e0911de" FOREIGN KEY ("socialUserId") REFERENCES "userinfodata"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userpost" ADD CONSTRAINT "FK_54360ab3d8b74907afe28adc590" FOREIGN KEY ("nonSocialUserId") REFERENCES "non_social_user_info_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userpost" DROP CONSTRAINT "FK_54360ab3d8b74907afe28adc590"`);
        await queryRunner.query(`ALTER TABLE "userpost" DROP CONSTRAINT "FK_8033b38ef8c57610a5b0e0911de"`);
        await queryRunner.query(`ALTER TABLE "user_like" DROP CONSTRAINT "FK_91f2c6ac468e0b68fa2ac0a11ae"`);
        await queryRunner.query(`ALTER TABLE "user_like" DROP CONSTRAINT "FK_cf2ee7fd77d84d8ae1bfdb3b8db"`);
        await queryRunner.query(`ALTER TABLE "user_comment" DROP CONSTRAINT "FK_0de594f170103908723318aea69"`);
        await queryRunner.query(`ALTER TABLE "user_comment" DROP CONSTRAINT "FK_ebd475b57b16b0039934dc31a14"`);
        await queryRunner.query(`DROP TABLE "userpost"`);
        await queryRunner.query(`DROP TABLE "non_social_user_info_data"`);
        await queryRunner.query(`DROP TABLE "userinfodata"`);
        await queryRunner.query(`DROP TABLE "user_like"`);
        await queryRunner.query(`DROP TABLE "user_comment"`);
    }

}
