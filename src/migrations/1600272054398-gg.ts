import {MigrationInterface, QueryRunner} from "typeorm";

export class gg1600272054398 implements MigrationInterface {
    name = 'gg1600272054398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "originalname" character varying NOT NULL, "mimetype" character varying NOT NULL, "originalId" integer, "thumbId" integer, CONSTRAINT "REL_867c307b782226e51a3fdae556" UNIQUE ("originalId"), CONSTRAINT "REL_86c7da329fa605dc8684c3736f" UNIQUE ("thumbId"), CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image_data" ("id" SERIAL NOT NULL, "ACL" character varying NOT NULL, "Location" character varying NOT NULL, "key" character varying NOT NULL, "Key" character varying NOT NULL, "Bucket" character varying NOT NULL, "format" character varying NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "channels" integer NOT NULL, "premultiplied" boolean NOT NULL, "size" integer NOT NULL, "ContentType" character varying NOT NULL, "mimetype" character varying NOT NULL, CONSTRAINT "PK_3eb20ad747eb922ebf842c46cfb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatarId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_58f5c71eaab331645112cf8cfa" UNIQUE ("avatarId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_867c307b782226e51a3fdae5562" FOREIGN KEY ("originalId") REFERENCES "image_data"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_86c7da329fa605dc8684c3736f1" FOREIGN KEY ("thumbId") REFERENCES "image_data"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5" FOREIGN KEY ("avatarId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_58f5c71eaab331645112cf8cfa5"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_86c7da329fa605dc8684c3736f1"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_867c307b782226e51a3fdae5562"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "image_data"`);
        await queryRunner.query(`DROP TABLE "image"`);
    }

}
