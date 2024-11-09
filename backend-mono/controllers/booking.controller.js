const Service = require("../services/booking.services");

const getAllBookingsHandler = async function(req, res) {
  try {
    const bookings = await Service.getAllBookings();
    if (bookings.length === 0) {
      console.log("No booking found");
      return res.status(200).json({ message: "No booking found" });
    }
    console.log("Bookings returned length:", bookings.length);
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
      console.log("No booking found");
      return res.status(200).json({ message: "No booking found" });
    }
    console.log("Bookings returned length:", bookings.length);
    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors
  }
}

const getBookingByListingIdHandler = async function(req, res) {
  try {
    const { listing_id } = req.params;
    const bookings = await Service.getBookingByListingId(listing_id);
    if (bookings.length === 0) {
      console.log("No booking found");
      return res.status(200).json({ message: "No booking found" });
    }
    console.log("Bookings returned length:", bookings.length);
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
    if (booking === null) {
      console.log("No booking found");
      return res.status(200).json({ message: "No booking found" });
    }
    console.log("Booking id returned:", booking_id);
    return res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors
  }
}


const newBookingHandler = async function(req, res) {
  try {
    const { body } = req;
    const booking = await Service.newBooking(body);

    if (typeof booking === "string") {
      // Handle error message from service
      console.log(booking);
      return res.status(400).json({ message: booking });
    }

    // Handle successful response
    console.log("New booking created successfully");
    res.status(201).json({
      message: "New booking created successfully",
      booking: booking,
    });

  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  getAllBookingsHandler,
  newBookingHandler,
  getBookingByUserIdHandler,
  getBookingByIdHandler,
  getBookingByListingIdHandler
}

