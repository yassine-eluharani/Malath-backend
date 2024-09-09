const prisma = require('./prismaClient');

const checkIfUserExists = async (user_id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    return !!user; // Returns true if the user exists, false otherwise
  } catch (error) {
    console.error("Error checking if user exists:", error);
    throw new Error("Internal Server Error");
  }
};

module.exports = { checkIfUserExists };

