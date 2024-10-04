/*
  Warnings:

  - You are about to drop the column `userId` on the `Todo` table. All the data in the column will be lost.
  - The `dueDate` column on the `Todo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "userId",
DROP COLUMN "dueDate",
ADD COLUMN     "dueDate" TIMESTAMP(3);
