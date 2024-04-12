const PrismaClient = require('@prisma/client').PrismaClient

const prisma = new PrismaClient()

const saveUser = async (attributes, res) => {
  try {
    const {
      created_at,
      first_name,
      last_name,
      profile_image_url,
      username,
    } = attributes;

    const email = attributes.email_addresses[0].email_address;
    const clerkId = attributes.email_addresses[0].id;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User with the same email already exists:", existingUser);
      res.status(409).json({ error: "User with the same email already exists" });
      return;
    }


    await prisma.user.create({
      data: {
        clerkId,
        first_name,
        username,
        last_name,
        email,
        profileImage: profile_image_url,
        createdAt: created_at,
      },
    });
    res.json({ message: "User synced successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const deleteUserByClerkId = async (clerkId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      console.log("User not found");
      return false;
    }

    await prisma.user.delete({
      where: { clerkId },
    });

    console.log(`User with clerkId ${clerkId} deleted successfully`);
    return true; // Return true to indicate successful deletion
  } catch (error) {
    console.error("Error deleting user:", error);
    return false; // Return false or handle accordingly if there's an error
  }
};



module.exports = {
  saveUser,
  deleteUserByClerkId,
};

