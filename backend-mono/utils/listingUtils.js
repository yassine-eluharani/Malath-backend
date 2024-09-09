const prisma = require('./prismaClient');

const checkIfListingExists = async (listing_id) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listing_id
      }
    });


    return !!listing;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    throw new Error("Internal Server Error");
  }
};

module.exports = { checkIfListingExists };

