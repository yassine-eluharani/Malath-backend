// const PrismaClient = require('@prisma/client').PrismaClient
// const prisma = new PrismaClient()

const getAllListings = async (res) => {
  try {
    res.json({ message: "All listing synced successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


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
  newListing
};


