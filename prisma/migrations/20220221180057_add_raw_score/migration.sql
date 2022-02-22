/*
  Warnings:

  - Added the required column `rawScore` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rawScore` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "rawScore" INTEGER NOT NULL GENERATED ALWAYS AS ("upsNum" - "downsNum") STORED;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "rawScore" INTEGER NOT NULL GENERATED ALWAYS AS ("upsNum" - "downsNum") STORED;;
