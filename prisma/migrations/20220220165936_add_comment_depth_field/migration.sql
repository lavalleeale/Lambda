/*
  Warnings:

  - Added the required column `depth` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "depth" INTEGER NULL;
UPDATE "Comment" SET depth=1;
ALTER TABLE "Comment" ALTER COLUMN "depth" SET NOT NULL;
