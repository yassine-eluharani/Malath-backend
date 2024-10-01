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

// Protected routes
router.get(
  "/user/:user_id",
  ClerkExpressRequireAuth(),
  bodyParser.raw({ type: 'application/json' }),
  Controller.getListingByUserIdHandler
);

router.get(
  "/:listing_id",
  ClerkExpressRequireAuth(),
  bodyParser.raw({ type: 'application/json' }),
  Controller.getListingByListingIdHandler
);

router.post(
  "/new",
  ClerkExpressRequireAuth(),
  bodyParser.raw({ type: 'application/json' }),
  Controller.newListingHandler
);

module.exports = router;

