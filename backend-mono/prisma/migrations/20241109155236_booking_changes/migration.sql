/*
  Warnings:

  - The `status` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusBooking" AS ENUM ('CONFIRMED', 'PENDING');

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "status",
ADD COLUMN     "status" "StatusBooking" NOT NULL DEFAULT 'PENDING';
