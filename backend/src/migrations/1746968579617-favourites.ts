import { MigrationInterface, QueryRunner } from "typeorm";

export class Favourites1746968579617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            ` 
                    --Table Definition
                    CREATE TABLE "favourites" (
                        "id" SERIAL PRIMARY KEY,
                        "user_id" int references users (id),
                        "movie_id" int references movies (id),
                        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                        CONSTRAINT fk_movie FOREIGN KEY (movie_id) REFERENCES movies (id) ON DELETE CASCADE,
                        UNIQUE (user_id, movie_id),
                        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
);`
        ),
            undefined;
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "favourites"`, undefined);
    }

}
