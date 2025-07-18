-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'EASY',
    "tags" TEXT[],
    "userId" TEXT NOT NULL,
    "examples" JSONB NOT NULL,
    "constraints" JSONB NOT NULL,
    "hints" TEXT,
    "editorial" TEXT,
    "testcases" JSONB NOT NULL,
    "codeSnippets" JSONB NOT NULL,
    "refrenceSolution" JSONB NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
