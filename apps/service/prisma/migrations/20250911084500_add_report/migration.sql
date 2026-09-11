-- CreateEnum
CREATE TYPE "ReportReason" AS ENUM ('abuse', 'obscene', 'spam', 'privacy', 'etc');

-- AlterTable
ALTER TABLE "Whisper" ADD COLUMN     "hiddenAt" TIMESTAMP(3),
ADD COLUMN     "hiddenUntil" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "whisperId" TEXT NOT NULL,
    "reporterId" VARCHAR(64) NOT NULL,
    "reason" "ReportReason" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Report_whisperId_idx" ON "Report"("whisperId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_whisperId_reporterId_key" ON "Report"("whisperId", "reporterId");

-- CreateIndex
CREATE INDEX "Whisper_hiddenUntil_idx" ON "Whisper"("hiddenUntil");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_whisperId_fkey" FOREIGN KEY ("whisperId") REFERENCES "Whisper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

