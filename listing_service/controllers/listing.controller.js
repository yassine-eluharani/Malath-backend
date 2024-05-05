const Service = require("../services/listing.services");

const getListings = async function(req, res) {
  try {
    const listings = await Service.getAllListings();
    if (listings.length === 0) {
      return res.status(404).json({ message: "No listing found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors
  }
}


const newListing = async function(req, res) {
  try {
    const { body } = req;
    await Service.newListing(body, res);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors
  }
}


module.exports = {
  getListings,
  newListing
}

