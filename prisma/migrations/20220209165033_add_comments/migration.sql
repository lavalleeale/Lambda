/*
  Warnings:

  - You are about to drop the `_downs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_downs" DROP CONSTRAINT "_downs_A_fkey";

-- DropForeignKey
ALTER TABLE "_downs" DROP CONSTRAINT "_downs_B_fkey";

-- DropForeignKey
ALTER TABLE "_ups" DROP CONSTRAINT "_ups_A_fkey";

-- DropForeignKey
ALTER TABLE "_ups" DROP CONSTRAINT "_ups_B_fkey";

-- DropTable
DROP TABLE "_downs";

-- DropTable
DROP TABLE "_ups";

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" DECIMAL(65,7) NOT NULL GENERATED ALWAYS AS (round(cast(log(greatest(abs("upsNum" - "downsNum"), 1)) * sign("upsNum" - "downsNum") + (date_part('epoch', "createdAt") - 1643673600) / 45000.0 as numeric), 7)) STORED,
    "upsNum" INTEGER NOT NULL DEFAULT 1,
    "downsNum" INTEGER NOT NULL DEFAULT 0,
    "body" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT,
    "parentId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_postsUps" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_postsDowns" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_commentsUps" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_commentsDowns" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_postsUps_AB_unique" ON "_postsUps"("A", "B");

-- CreateIndex
CREATE INDEX "_postsUps_B_index" ON "_postsUps"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_postsDowns_AB_unique" ON "_postsDowns"("A", "B");

-- CreateIndex
CREATE INDEX "_postsDowns_B_index" ON "_postsDowns"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_commentsUps_AB_unique" ON "_commentsUps"("A", "B");

-- CreateIndex
CREATE INDEX "_commentsUps_B_index" ON "_commentsUps"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_commentsDowns_AB_unique" ON "_commentsDowns"("A", "B");

-- CreateIndex
CREATE INDEX "_commentsDowns_B_index" ON "_commentsDowns"("B");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_postsUps" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_postsUps" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_postsDowns" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_postsDowns" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_commentsUps" ADD FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_commentsUps" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_commentsDowns" ADD FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_commentsDowns" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
