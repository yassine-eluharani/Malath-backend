const express = require("express");
const router = express.Router();
const Controller = require("../controllers/booking.controller");
const bodyParser = require('body-parser');


// Public routes
router.get(
  "/",
  bodyParser.raw({ type: 'application/json' }),
  Controller.getAllBookingsHandler
);

router.post(
  "/new",
  bodyParser.raw({ type: 'application/json' }),
  Controller.newBookingHandler
);

module.exports = router;

