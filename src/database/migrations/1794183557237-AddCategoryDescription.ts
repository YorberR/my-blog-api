import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryDescription1794183557237 implements MigrationInterface {
    name = 'AddCategoryDescription1794183557237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "description" character varying(800)`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "cover_image"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "cover_image" character varying(800)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "cover_image"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "cover_image" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
    }

}
