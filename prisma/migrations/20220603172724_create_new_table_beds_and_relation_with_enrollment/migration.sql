/*
  Warnings:

  - You are about to drop the column `beds` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `enrollmentId` on the `rooms` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_enrollmentId_fkey";

-- DropIndex
DROP INDEX "rooms_enrollmentId_key";

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "beds",
DROP COLUMN "enrollmentId";

-- CreateTable
CREATE TABLE "beds" (
    "id" SERIAL NOT NULL,
    "occupied" BOOLEAN NOT NULL DEFAULT false,
    "enrollmentId" INTEGER,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "beds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "beds_enrollmentId_key" ON "beds"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "beds_roomId_key" ON "beds"("roomId");

-- AddForeignKey
ALTER TABLE "beds" ADD CONSTRAINT "beds_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beds" ADD CONSTRAINT "beds_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
