const express = require("express");
const router = express.Router();
const Controller = require("../controllers/listing.controller");
const bodyParser = require('body-parser');


// Public routes
router.get(
  "/",
  bodyParser.raw({ type: 'application/json' }),
  Controller.getListingsHandler
);

router.get(
  "/:user_id",
  bodyParser.raw({ type: 'application/json' }),
  Controller.getListingByUserIdHandler
);


router.post(
  "/new",
  bodyParser.raw({ type: 'application/json' }),
  Controller.newListingHandler
);

module.exports = router;

