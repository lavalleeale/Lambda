-- CreateTable
CREATE TABLE "_SectionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SectionToUser_AB_unique" ON "_SectionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SectionToUser_B_index" ON "_SectionToUser"("B");

-- AddForeignKey
ALTER TABLE "_SectionToUser" ADD FOREIGN KEY ("A") REFERENCES "Section"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectionToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
