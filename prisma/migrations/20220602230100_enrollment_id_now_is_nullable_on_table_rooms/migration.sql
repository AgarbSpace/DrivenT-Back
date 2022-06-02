-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_enrollmentId_fkey";

-- AlterTable
ALTER TABLE "rooms" ALTER COLUMN "enrollmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
