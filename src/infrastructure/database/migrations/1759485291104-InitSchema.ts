import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1759485291104 implements MigrationInterface {
    name = 'InitSchema1759485291104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        // GROUP TABLE
        await queryRunner.query(`
      CREATE TABLE "Group" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" VARCHAR NOT NULL UNIQUE,
        "description" VARCHAR NOT NULL,
        "type" VARCHAR NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
      );
    `);

        // USER TABLE
        await queryRunner.query(`
      CREATE TABLE "User" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "username" VARCHAR NOT NULL UNIQUE,
        "password" VARCHAR NOT NULL,
        "role" VARCHAR NOT NULL,
        "email" VARCHAR,
        "fullName" VARCHAR,
        "status" VARCHAR NOT NULL,
        "groupId" uuid,
        "apiKey" VARCHAR,
        "hashedRefreshToken" TEXT,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "FK_User_Group" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL
      );
    `);

        // TRANSACTION TABLE
        await queryRunner.query(`
      CREATE TABLE "Transaction" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "title" VARCHAR NOT NULL,
        "amount" NUMERIC NOT NULL,
        "category" VARCHAR NOT NULL,
        "description" VARCHAR,
        "status" VARCHAR NOT NULL DEFAULT 'PENDING',
        "submittedBy" uuid NOT NULL,
        "approvedBy" uuid,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "FK_Transaction_SubmittedBy" FOREIGN KEY ("submittedBy") REFERENCES "User"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_Transaction_ApprovedBy" FOREIGN KEY ("approvedBy") REFERENCES "User"("id") ON DELETE SET NULL
      );
    `);

        // AUDIT LOG TABLE
        await queryRunner.query(`
      CREATE TABLE "AuditLog" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "actorId" uuid NOT NULL,
        "action" VARCHAR NOT NULL,
        "targetEntity" VARCHAR NOT NULL,
        "targetId" uuid NOT NULL,
        "metadata" JSONB,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now()
      );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "AuditLog";`);
        await queryRunner.query(`DROP TABLE "Transaction";`);
        await queryRunner.query(`DROP TABLE "User";`);
        await queryRunner.query(`DROP TABLE "Group";`);
    }
}
