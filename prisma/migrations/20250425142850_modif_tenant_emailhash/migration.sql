/*
  Warnings:

  - A unique constraint covering the columns `[emailHash]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailHash` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "emailHash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_emailHash_key" ON "Tenant"("emailHash");
