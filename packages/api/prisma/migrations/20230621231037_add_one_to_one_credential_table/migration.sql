/*
  Warnings:

  - You are about to drop the column `professional_id` on the `professional_credentials` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `professional_credentials` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `professional_credentials` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "professional_credentials" DROP CONSTRAINT "professional_credentials_professional_id_fkey";

-- DropIndex
DROP INDEX "professional_credentials_professional_id_key";

-- AlterTable
ALTER TABLE "professional_credentials" DROP COLUMN "professional_id",
ADD COLUMN     "id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "credential_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "professional_credentials_id_key" ON "professional_credentials"("id");

-- AddForeignKey
ALTER TABLE "professionals" ADD CONSTRAINT "professionals_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "professional_credentials"("id") ON DELETE SET NULL ON UPDATE CASCADE;
