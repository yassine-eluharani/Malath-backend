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


const newBooking = async (body, res) => {
  try {
    // Parse the request body
    const parsedBody = JSON.parse(body.toString());
    const { user_id, listing_id, payment_id, check_in_date, check_out_date, status } = parsedBody;
    // Create a new booking using the Prisma client
    const booking = await prisma.booking.create({
      data: {
        user_id: user_id,
        listing_id: listing_id,
        payment_id: payment_id,
        check_in_date: new Date(check_in_date),
        check_out_date: new Date(check_out_date),
        status: status,
      },
    });
    // Send success response
    res.json({
      message: "New booking created successfully",
      booking: booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = {
  getAllBookings,
  newBooking,
  getBookingByUserId,
  getBookingById
};


