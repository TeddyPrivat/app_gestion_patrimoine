/*
  Warnings:

  - You are about to drop the column `tenantId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Tenant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tenantId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "tenantId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "tenantId";

-- DropTable
DROP TABLE "Tenant";
