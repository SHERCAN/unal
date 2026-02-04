/*
  Warnings:

  - You are about to drop the column `firstTryCorrect` on the `exercise_attempts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exercise_attempts" DROP COLUMN "firstTryCorrect",
ADD COLUMN     "attemptCount" INTEGER NOT NULL DEFAULT 1;
