import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMy1717385051864 implements MigrationInterface {
    name = 'NewMy1717385051864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "non_social_user_info_data" ("id" SERIAL NOT NULL, "userid" character varying(255) NOT NULL, "userPassWord" character varying(255), "userNickName" character varying(255) NOT NULL, "useremail" character varying(255), CONSTRAINT "UQ_f32b238debf5a6b654de3baf7f6" UNIQUE ("userid"), CONSTRAINT "UQ_b0bb91c336335f366d9bda4605e" UNIQUE ("useremail"), CONSTRAINT "PK_04600704d749449f068b707fd3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_comment" ("commentid" SERIAL NOT NULL, "username" character(255) NOT NULL, "userId" integer, "userNickName" character(255), "postuuid" uuid NOT NULL, "text" text NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "postId" integer, CONSTRAINT "PK_7dd36ba9db14087573478110a12" PRIMARY KEY ("commentid"))`);
        await queryRunner.query(`CREATE TABLE "user_post" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "menubar" character varying(255), "title" character varying(255), "photosumnail" character varying(255), "photos" text array NOT NULL DEFAULT '{}', "userNickName" character varying(255), "socialUserId" integer, "nonSocialUserId" integer, CONSTRAINT "PK_6322e69009fa8c98239d8b9dd6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_info_data" ("id" SERIAL NOT NULL, "username" character varying(255), "userId" character varying(255), "useremail" character varying(255), "userNickName" character varying(255), "userPassWord" character varying(255), "loginType" character varying NOT NULL DEFAULT false, CONSTRAINT "PK_af8aa7adbd237800b406a184f16" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_like" ("likeid" SERIAL NOT NULL, "username" character varying(255) NOT NULL, "userId" integer, "postid" uuid NOT NULL, "creationdate" TIMESTAMP NOT NULL DEFAULT now(), "postId" integer, CONSTRAINT "PK_a9b51477689050c21dfdd7e1718" PRIMARY KEY ("likeid"))`);
        await queryRunner.query(`ALTER TABLE "user_comment" ADD CONSTRAINT "FK_ebd475b57b16b0039934dc31a14" FOREIGN KEY ("userId") REFERENCES "user_info_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_comment" ADD CONSTRAINT "FK_0de594f170103908723318aea69" FOREIGN KEY ("postId") REFERENCES "user_post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_post" ADD CONSTRAINT "FK_9ee00dc2fb3fdf033cc8e7d58ec" FOREIGN KEY ("socialUserId") REFERENCES "user_info_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_post" ADD CONSTRAINT "FK_c38d680d9b7085ae4223d990982" FOREIGN KEY ("nonSocialUserId") REFERENCES "non_social_user_info_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_like" ADD CONSTRAINT "FK_cf2ee7fd77d84d8ae1bfdb3b8db" FOREIGN KEY ("userId") REFERENCES "user_info_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_like" ADD CONSTRAINT "FK_91f2c6ac468e0b68fa2ac0a11ae" FOREIGN KEY ("postId") REFERENCES "user_post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_like" DROP CONSTRAINT "FK_91f2c6ac468e0b68fa2ac0a11ae"`);
        await queryRunner.query(`ALTER TABLE "user_like" DROP CONSTRAINT "FK_cf2ee7fd77d84d8ae1bfdb3b8db"`);
        await queryRunner.query(`ALTER TABLE "user_post" DROP CONSTRAINT "FK_c38d680d9b7085ae4223d990982"`);
        await queryRunner.query(`ALTER TABLE "user_post" DROP CONSTRAINT "FK_9ee00dc2fb3fdf033cc8e7d58ec"`);
        await queryRunner.query(`ALTER TABLE "user_comment" DROP CONSTRAINT "FK_0de594f170103908723318aea69"`);
        await queryRunner.query(`ALTER TABLE "user_comment" DROP CONSTRAINT "FK_ebd475b57b16b0039934dc31a14"`);
        await queryRunner.query(`DROP TABLE "user_like"`);
        await queryRunner.query(`DROP TABLE "user_info_data"`);
        await queryRunner.query(`DROP TABLE "user_post"`);
        await queryRunner.query(`DROP TABLE "user_comment"`);
        await queryRunner.query(`DROP TABLE "non_social_user_info_data"`);
    }

}
