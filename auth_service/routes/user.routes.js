const express = require("express");
const router = express.Router();
const Controller = require("../controllers/user.controller");
// const { validateFields } = require('../middleware/validateFields');
const bodyParser = require('body-parser');


// Public routes
router.post(
  "/webhook",
  bodyParser.raw({ type: 'application/json' }),
  Controller.registerWebHook
);


router.post(
  "/register/phone",
  Controller.registerPhone
);

module.exports = router;
