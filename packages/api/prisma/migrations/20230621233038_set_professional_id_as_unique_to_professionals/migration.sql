/*
  Warnings:

  - You are about to drop the column `id` on the `professional_credentials` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[professional_id]` on the table `professional_credentials` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "professional_credentials_id_key";

-- AlterTable
ALTER TABLE "professional_credentials" DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "professional_credentials_professional_id_key" ON "professional_credentials"("professional_id");
