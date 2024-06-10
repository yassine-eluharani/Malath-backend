const PrismaClient = require('@prisma/client').PrismaClient
const prisma = new PrismaClient()

const getAllBookings = async () => {
  try {
    const bookings = await prisma.booking.findMany();
    return bookings;
  } catch (error) {
    throw new Error("Error fetching booking: " + error.message);

  }
};

const newBooking = async (body, res) => {
  try {
    const parsedBody = JSON.parse(body.toString());
    // const {
    //   type_of_listing,
    //   address,
    //   city,
    //   block,
    //   coords,
    //   guests,
    //   bedrooms,
    //   beds,
    //   bathrooms,
    //   regular_amenities,
    //   photos,
    //   photos_blob,
    //   title,
    //   description,
    //   square_feet,
    //   price_nightly,
    //   price_weekly,
    //   price_monthly,
    //   deposit,
    //   safety_items,
    //   user_id
    // } = parsedBody;
    //
    // const photosBuffer = photos_blob.map(photo => Buffer.from(photo, 'base64'));
    //
    // const listing = await prisma.listing.create({
    //   data: {
    //     type_of_listing,
    //     address,
    //     city,
    //     block,
    //     coords,
    //     guests,
    //     bedrooms,
    //     beds,
    //     bathrooms,
    //     regular_amenities,
    //     photos,
    //     photos_blob: photosBuffer,
    //     title,
    //     description,
    //     square_feet,
    //     price_nightly,
    //     price_weekly,
    //     price_monthly,
    //     deposit,
    //     safety_items,
    //     user_id
    //   },
    // });

    res.json({
      message: "New listing created successfully",
      listing: listing
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = {
  getAllBookings,
  newBooking
};


