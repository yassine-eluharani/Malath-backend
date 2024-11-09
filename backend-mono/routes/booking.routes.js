const express = require("express");
const router = express.Router();
const Controller = require("../controllers/booking.controller");
const bodyParser = require('body-parser');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node')


// Public routes
router.get(
  "/",
  bodyParser.raw({ type: 'application/json' }),
  Controller.getAllBookingsHandler
);

router.get(
  "/user/:user_id",
  ClerkExpressRequireAuth(),
  bodyParser.raw({ type: 'application/json' }),
  Controller.getBookingByUserIdHandler
);

router.get(
  "/:booking_id",
  ClerkExpressRequireAuth(),
  bodyParser.raw({ type: 'application/json' }),
  Controller.getBookingByIdHandler
);


router.post(
  "/",
  ClerkExpressRequireAuth(),
  bodyParser.raw({ type: 'application/json' }),
  Controller.newBookingHandler
);

module.exports = router;

