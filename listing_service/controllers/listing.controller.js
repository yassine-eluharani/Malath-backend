const Service = require("../services/listing.services");

const getListings = async function(req, res) {
  try {
    const listings = await Service.getAllListings();
    if (listings.length === 0) {
      return res.status(404).json({ message: "No listings found" }); // If no listing found, return a message
    }
    return res.status(200).json(listings); // If listing found, return them
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }

}

const newListing = async function(req, res) {
  try {
    const { body } = req;
    await Service.newListing(body, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}


module.exports = {
  getListings,
  newListing
}

