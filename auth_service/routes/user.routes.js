const express = require("express");
const router = express.Router();
const Controller = require("../controllers/user.controller");
// const { validateFields } = require('../middleware/validateFields');
const bodyParser = require('body-parser');


// Public routes
router.post(
  "/register/webhook",
  bodyParser.raw({ type: 'application/json' }),
  Controller.registerWebHook
);

module.exports = router;
