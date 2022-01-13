import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1642103719285 implements MigrationInterface {
  name = 'InitialMigration1642103719285';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "fundingGoal" integer NOT NULL, "location" text NOT NULL, "userId" integer NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" text NOT NULL, "username" text NOT NULL, "email" text NOT NULL, "active" boolean NOT NULL DEFAULT false, "passwordHash" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "refresh-token" ("token" character(21) NOT NULL, "expiry" TIMESTAMP NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_895eefbc5efe4f52da9090b4d18" PRIMARY KEY ("token"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh-token" ADD CONSTRAINT "FK_980388a8baa20f67d6610a1afd3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "refresh-token" DROP CONSTRAINT "FK_980388a8baa20f67d6610a1afd3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63"`,
    );
    await queryRunner.query(`DROP TABLE "refresh-token"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "project"`);
  }
}
