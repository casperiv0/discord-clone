-- DropForeignKey
ALTER TABLE "Guild" DROP CONSTRAINT "Guild_ownerId_fkey";

-- DropIndex
DROP INDEX "Guild_ownerId_unique";
