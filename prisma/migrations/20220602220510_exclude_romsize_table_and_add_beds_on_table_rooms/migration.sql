/*
  Warnings:

  - You are about to drop the column `roomSizeId` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the `roomSize` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `beds` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_roomSizeId_fkey";

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "roomSizeId",
ADD COLUMN     "beds" INTEGER NOT NULL;

-- DropTable
DROP TABLE "roomSize";
