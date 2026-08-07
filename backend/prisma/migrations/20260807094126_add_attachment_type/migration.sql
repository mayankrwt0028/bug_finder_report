-- CreateEnum
CREATE TYPE "AttachmentType" AS ENUM ('BUG', 'SOLUTION');

-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "type" "AttachmentType" NOT NULL DEFAULT 'BUG';
