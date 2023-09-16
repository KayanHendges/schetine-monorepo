/*
  Warnings:

  - You are about to drop the column `credential_id` on the `professionals` table. All the data in the column will be lost.
  - Added the required column `password` to the `professional_credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professional_id` to the `professional_credentials` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "professionals" DROP CONSTRAINT "professionals_credential_id_fkey";

-- AlterTable
ALTER TABLE "professional_credentials" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "professional_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "professionals" DROP COLUMN "credential_id";

-- AddForeignKey
ALTER TABLE "professional_credentials" ADD CONSTRAINT "professional_credentials_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
