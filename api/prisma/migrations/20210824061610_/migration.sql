/*
  Warnings:

  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "statusMessage" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusType" NOT NULL DEFAULT E'ONLINE';
