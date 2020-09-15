import {MigrationInterface, QueryRunner} from "typeorm";

export class profilePictureIsNowAvatar1600174454989 implements MigrationInterface {
    name = 'profilePictureIsNowAvatar1600174454989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "profilePictureUrl" TO "avatarPath"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "avatarPath" TO "profilePictureUrl"`);
    }

}
