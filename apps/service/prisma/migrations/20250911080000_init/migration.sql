-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('empathy', 'cheer', 'hug');

-- CreateTable
CREATE TABLE "Whisper" (
    "id" TEXT NOT NULL,
    "authorId" VARCHAR(64) NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "locationCode" VARCHAR(32) NOT NULL,
    "locationName" VARCHAR(50) NOT NULL,
    "weatherCode" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Whisper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "whisperId" TEXT NOT NULL,
    "userId" VARCHAR(64) NOT NULL,
    "type" "ReactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Whisper_createdAt_idx" ON "Whisper"("createdAt");

-- CreateIndex
CREATE INDEX "Whisper_authorId_createdAt_idx" ON "Whisper"("authorId", "createdAt");

-- CreateIndex
CREATE INDEX "Reaction_whisperId_idx" ON "Reaction"("whisperId");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_whisperId_userId_type_key" ON "Reaction"("whisperId", "userId", "type");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_whisperId_fkey" FOREIGN KEY ("whisperId") REFERENCES "Whisper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

