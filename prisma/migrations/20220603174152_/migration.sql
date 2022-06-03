/*
  Warnings:

  - You are about to drop the column `enrollmentId` on the `beds` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bedId]` on the table `enrollments` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "beds" DROP CONSTRAINT "beds_enrollmentId_fkey";

-- DropIndex
DROP INDEX "beds_enrollmentId_key";

-- AlterTable
ALTER TABLE "beds" DROP COLUMN "enrollmentId";

-- AlterTable
ALTER TABLE "enrollments" ADD COLUMN     "bedId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_bedId_key" ON "enrollments"("bedId");

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_bedId_fkey" FOREIGN KEY ("bedId") REFERENCES "beds"("id") ON DELETE SET NULL ON UPDATE CASCADE;
