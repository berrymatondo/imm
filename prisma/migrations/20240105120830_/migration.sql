/*
  Warnings:

  - The primary key for the `Parameter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Parameter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Parameter` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `Parameter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Parameter" DROP CONSTRAINT "Parameter_pkey",
DROP COLUMN "id",
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Parameter_name_key" ON "Parameter"("name");
