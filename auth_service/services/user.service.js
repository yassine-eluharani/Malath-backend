const ErrorResponse = require("../utils/errorResponse");
const generateOTP = require("../utils/generateOTP");
const bcrypt = require("bcrypt");
const PrismaClient = require('@prisma/client').PrismaClient

const prisma = new PrismaClient()

const register = async (phoneNumber) => {
  if (!phoneNumber) {
    throw new ErrorResponse(
      "username or email or password or firstName or lastName  not valid",
      400
    );
  }

  const userByPhoneNumber = await prisma.user.findUnique({
    where: { phoneNumber },
  });

  if (userByPhoneNumber) {
    throw new ErrorResponse("User Already Exist", 409);
  }

  await prisma.user.create({
    data: {
      phoneNumber,
    },
  });

  // generate OTP
  const OTP = generateOTP();
  const hashedOTP = await bcrypt.hash(OTP, 8);

  // Store the OTP in the database tp validate later
  await prisma.opt.create({
    data: {
      phoneNumber,
      code: hashedOTP,
      expire: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  // Send the OTP to the user's phone number

};

module.exports = {
  register,
};


