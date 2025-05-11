import { MigrationInterface, QueryRunner } from "typeorm";

export class Movies1746515584369 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            --Table Definition
            CREATE TABLE "movies"  (
               "id" SERIAL PRIMARY KEY,
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "director" character varying,
                "year" character varying,
                "rating" integer,
                "image" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
              )
              `),
      undefined;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "movies"`, undefined);
  }
}
