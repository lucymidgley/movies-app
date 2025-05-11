import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1746515194574 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      ` 
                --Table Definition
                CREATE TABLE "users"  (
                  "id" SERIAL PRIMARY KEY,
                  "name" character varying NOT NULL,
                  "email" character varying NOT NULL UNIQUE,
                  "password" character varying NOT NULL,
                  "emailToken" character varying DEFAULT NULL,
                  "passwordToken" character varying DEFAULT NULL,
                  "confirmed" boolean NOT NULL DEFAULT false,
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
