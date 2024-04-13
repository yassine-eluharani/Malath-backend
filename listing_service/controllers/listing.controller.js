const Service = require("../services/listing.services");

const getListings = async function(req, res) {
  try {
    await Service.getAllListings(res);
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

