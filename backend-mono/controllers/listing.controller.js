const Service = require("../services/listing.services");

const getListingsHandler = async function(req, res) {
  try {
    const listings = await Service.getAllListings();
    if (listings.length === 0) {
      console.log("No listing found");
      return res.status(200).json({ message: "No listing found" });
    }
    console.log("Listings returned length:", listings.length);
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
      console.log("No listing found");
      return res.status(200).json({ message: "No listing found" });
    }
    console.log("Listings returned length:", listings.length);
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
    console.log("Listing id returned:", listing_id);
    return res.status(200).json(listing);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors
  }
}


const newListingHandler = async function(req, res) {
  try {
    const { body } = req;
    const listing = await Service.newListing(body, res);

    // Check if the service returned an error message as a string
    if (typeof listing === "string") {
      console.log(listing);
      return res.status(400).json({ message: listing });
    }

    console.log("New listing created successfully");
    res.status(201).json({
      message: "New listing created successfully",
      listing: listing
    });

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

