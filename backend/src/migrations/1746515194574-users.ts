import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1746515194574 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      ` 
                --Table Definition
                CREATE TABLE "users"  (
                  "id" SERIAL PRIMARY KEY,
                  "name" character varying NOT NULL,
                  "email" character varying NOT NULL,
                  "password" character varying NOT NULL,
                  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                  "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
                )`
    ),
      undefined;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`, undefined);
  }
}
