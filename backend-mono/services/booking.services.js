const prisma = require('../utils/prismaClient');
const { checkIfUserExists } = require('../utils/userUtils');
const { checkIfListingExists } = require('../utils/listingUtils');


const getAllBookings = async () => {
  try {
    const bookings = await prisma.booking.findMany();
    return bookings;
  } catch (error) {
    throw new Error("Error fetching booking: " + error.message);

  }
};

const getBookingByUserId = async (user_id) => {
  try {
    const booking = await prisma.booking.findMany({
      where: {
        user_id: user_id
      }
    });
    return booking;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
}

const getBookingById = async (booking_id) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: {
        booking_id: booking_id
      }
    });
    return booking;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
}


const newBooking = async (body) => {
  try {
    const parsedBody = JSON.parse(body.toString());
    const { user_id, listing_id, payment_id, check_in_date, check_out_date, status } = parsedBody;

    // Check if the user exists
    const userExists = await checkIfUserExists(user_id);
    if (!userExists) {
      return "User not found. Cannot create booking without a valid user.";
    }

    // Check if the listing exists
    const listingExists = await checkIfListingExists(listing_id);
    if (!listingExists) {
      return "Listing not found. Cannot create booking without a valid listing.";
    }

    // Create a new booking using the Prisma client
    const booking = await prisma.booking.create({
      data: {
        user_id,
        listing_id,
        payment_id,
        check_in_date: new Date(check_in_date),
        check_out_date: new Date(check_out_date),
        status,
      },
    });

    return booking;

  } catch (error) {
    throw new Error("Error creating booking: " + error.message);
  }
};



module.exports = {
  getAllBookings,
  newBooking,
  getBookingByUserId,
  getBookingById
};


