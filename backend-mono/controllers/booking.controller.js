const Service = require("../services/booking.services");

const getAllBookingsHandler = async function(req, res) {
  try {
    const bookings = await Service.getAllBookings();
    if (bookings.length === 0) {
      return res.status(404).json({ message: "No booking found" });
    }
    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const getBookingByUserIdHandler = async function(req, res) {
  try {
    const { user_id } = req.params;
    const bookings = await Service.getBookingByUserId(user_id);
    if (bookings.length === 0) {
      return res.status(404).json({ message: "No booking found" });
    }
    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors
  }
}


const getBookingByIdHandler = async function(req, res) {
  try {
    const { booking_id } = req.params;
    const booking = await Service.getBookingById(booking_id);
    return res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors
  }
}


const newBookingHandler = async function(req, res) {
  try {
    const { body } = req;
    await Service.newBooking(body, res);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors
  }
}


module.exports = {
  getAllBookingsHandler,
  newBookingHandler,
  getBookingByUserIdHandler,
  getBookingByIdHandler
}

