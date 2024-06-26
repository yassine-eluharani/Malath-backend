const Service = require("../services/listing.services");

const getListingsHandler = async function(req, res) {
  try {
    const listings = await Service.getAllListings();
    if (listings.length === 0) {
      return res.status(404).json({ message: "No listing found" });
    }
    return res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors
  }
}

const getListingByUserIdHandler = async function(req, res) {
  try {
    const { user_id } = req.params;
    const listings = await Service.getListingByUserId(user_id);
    if (listings.length === 0) {
      return res.status(404).json({ message: "No listing found" });
    }
    return res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors
  }
}


const getListingByListingIdHandler = async function(req, res) {
  try {
    const { listing_id } = req.params;
    const listing = await Service.getListingByListingId(listing_id);
    return res.status(200).json(listing);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors
  }
}


const newListingHandler = async function(req, res) {
  try {
    const { body } = req;
    await Service.newListing(body, res);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors
  }
}


module.exports = {
  getListingsHandler,
  newListingHandler,
  getListingByUserIdHandler,
  getListingByListingIdHandler
}

