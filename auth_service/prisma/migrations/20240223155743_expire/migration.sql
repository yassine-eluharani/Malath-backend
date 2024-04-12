/*
  Warnings:

  - You are about to drop the column `userId` on the `OTP` table. All the data in the column will be lost.
  - Added the required column `expire` to the `OTP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OTP" DROP COLUMN "userId",
ADD COLUMN     "expire" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
