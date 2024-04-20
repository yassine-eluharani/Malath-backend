-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('CHALET', 'FARM', 'LOUNGE', 'TENT', 'BARN');

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "type_of_listing" "ListingType" NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "coords" TEXT NOT NULL,
    "guests" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "beds" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "regular_amenities" TEXT[],
    "photos" TEXT[],
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "square_feet" INTEGER NOT NULL,
    "price_nightly" DOUBLE PRECISION NOT NULL,
    "price_weekly" DOUBLE PRECISION NOT NULL,
    "price_monthly" DOUBLE PRECISION NOT NULL,
    "deposit" DOUBLE PRECISION NOT NULL,
    "safety_items" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

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
