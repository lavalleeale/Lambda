-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_sectionId_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("name") ON DELETE CASCADE ON UPDATE CASCADE;
