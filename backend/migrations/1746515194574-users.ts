import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1746515194574 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      ` 
                --Table Definition
                CREATE TABLE "users"  (
                  "id" bigint GENERATED ALWAYS AS IDENTITY,
                  "name" character varying NOT NULL,
                  "email" character varying NOT NULL,
                  "password" character varying NOT NULL,
                  "role"  character varying NOT NULL DEFAULT 'user',
                  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                )
                `
    ),
      undefined;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`, undefined);
  }
}
