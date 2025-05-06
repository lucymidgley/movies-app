import { MigrationInterface, QueryRunner } from "typeorm";

export class Movies1746515584369 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            --Table Definition
            CREATE TABLE "movies"  (
               "id" bigint GENERATED ALWAYS AS IDENTITY,
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "director" character varying NOT NULL,
                "year" integer NOT NULL,
                "rating" character varying NOT NULL,
                "image" character varying NOT NULL,
                "cast" character varying NOT NULL,
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
