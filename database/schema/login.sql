CREATE SCHEMA "public";
CREATE TYPE "roles" AS ENUM('view', 'edit', 'admim');
CREATE TABLE "login" (
	"name" varchar(255) NOT NULL,
	"password" varchar NOT NULL,
	"isActive" boolean DEFAULT true,
	"id" integer GENERATED ALWAYS AS IDENTITY (sequence name "login_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	CONSTRAINT "id_user_pkey" PRIMARY KEY("id")
);
CREATE TABLE "user_role" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_role_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"isActive" boolean DEFAULT true,
	"user_role" roles,
	"user_id" bigint NOT NULL
);
CREATE UNIQUE INDEX "id_user_pkey" ON "login" ("id");
CREATE UNIQUE INDEX "user_role_pkey" ON "user_role" ("id");
ALTER TABLE "user_role" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "login"("id") ON DELETE RESTRICT;