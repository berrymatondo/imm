/*
  Warnings:

  - You are about to drop the column `origin` on the `Parameter` table. All the data in the column will be lost.
  - You are about to drop the column `visible` on the `Parameter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Parameter" DROP COLUMN "origin",
DROP COLUMN "visible",
ADD COLUMN     "value" TEXT;
