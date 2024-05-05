const PrismaClient = require('@prisma/client').PrismaClient
const prisma = new PrismaClient()

const getAllListings = async () => {
  try {
    const listings = await prisma.listing.findMany();
    return listings;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);

  }
};


const getListingByUserId = async (user_id) => {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        user_id: user_id
      }
    });
    return listings;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
}


const newListing = async (body, res) => {
  try {
    const parsedBody = JSON.parse(body.toString());
    res.json({
      message: "New listing created successfully",
      body: parsedBody
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};


module.exports = {
  getAllListings,
  newListing,
  getListingByUserId
};


