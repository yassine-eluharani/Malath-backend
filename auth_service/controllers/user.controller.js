const Service = require("../services/user.service");
const asyncHandler = require("../middlewares/asyncMiddleware");

const register = asyncHandler(async (req, res, next) => {
  const { phoneNumber } = req.body;
  try {
    await Service.register(phoneNumber);
    res.status(200).json({
      message: "Successfully Registered , Please Check Your Mail",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  register,
}
