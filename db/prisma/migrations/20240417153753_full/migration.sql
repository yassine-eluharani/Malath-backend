/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `hasImage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `User` table. All the data in the column will be lost.
  - Added the required column `address` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bathrooms` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedrooms` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beds` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `block` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coords` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deposit` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guests` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_monthly` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_nightly` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_weekly` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `square_feet` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_of_listing` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('CHALET', 'FARM', 'LOUNGE', 'TENT', 'BARN');

-- DropIndex
DROP INDEX "User_phone_number_key";

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "createdAt",
DROP COLUMN "name",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "bathrooms" INTEGER NOT NULL,
ADD COLUMN     "bedrooms" INTEGER NOT NULL,
ADD COLUMN     "beds" INTEGER NOT NULL,
ADD COLUMN     "block" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "coords" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deposit" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "guests" INTEGER NOT NULL,
ADD COLUMN     "photos" TEXT[],
ADD COLUMN     "price_monthly" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price_nightly" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price_weekly" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "regular_amenities" TEXT[],
ADD COLUMN     "safety_items" TEXT[],
ADD COLUMN     "square_feet" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type_of_listing" "ListingType" NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hasImage",
DROP COLUMN "image_url",
ADD COLUMN     "profile_picture" TEXT,
ADD COLUMN     "scanned_id" TEXT,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "listing_id" TEXT NOT NULL,
    "overall_rating" DOUBLE PRECISION NOT NULL,
    "cleanliness_rating" DOUBLE PRECISION NOT NULL,
    "location_rating" DOUBLE PRECISION NOT NULL,
    "communication_rating" DOUBLE PRECISION NOT NULL,
    "comments" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
