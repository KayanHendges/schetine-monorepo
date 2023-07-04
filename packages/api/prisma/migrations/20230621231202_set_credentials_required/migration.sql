/*
  Warnings:

  - Made the column `credential_id` on table `professionals` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "professionals" DROP CONSTRAINT "professionals_credential_id_fkey";

-- AlterTable
ALTER TABLE "professionals" ALTER COLUMN "credential_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "professionals" ADD CONSTRAINT "professionals_credential_id_fkey" FOREIGN KEY ("credential_id") REFERENCES "professional_credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
