const express = require("express");
const router = express.Router();
const Controller = require("../controllers/listing.controller");
const bodyParser = require('body-parser');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node')


// Public routes
router.get(
  "/",
  bodyParser.raw({ type: 'application/json' }),
  Controller.getListingsHandler
);

router.get(
  "/:listing_id",
  bodyParser.raw({ type: 'application/json' }),
  Controller.getListingByListingIdHandler
);

// Protected routes
router.get(
  "/user/:user_id",
  ClerkExpressRequireAuth(),
  bodyParser.raw({ type: 'application/json' }),
  Controller.getListingByUserIdHandler
);


router.post(
  "/",
  ClerkExpressRequireAuth(),
  bodyParser.raw({ type: 'application/json' }),
  Controller.newListingHandler
);

module.exports = router;

