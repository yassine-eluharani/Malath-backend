
const validateFields = (req, res, next) => {
  const { email, phoneNumber, password, firstName, lastName } = req.body;
  const missingFields = [];

  if (!email) {
    missingFields.push("email");
  }

  if (!phoneNumber) {
    missingFields.push("phoneNumber");
  }

  if (!password) {
    missingFields.push("password");
  }

  if (!firstName) {
    missingFields.push("firstName");
  }

  if (!lastName) {
    missingFields.push("lastName");
  }

  if (missingFields.length > 0) {
    const errorMessage = `The following fields are missing: ${missingFields.join(", ")}`;
    return res.status(400).json({ error: errorMessage });
  }

  next();
};

module.exports = { validateFields };

