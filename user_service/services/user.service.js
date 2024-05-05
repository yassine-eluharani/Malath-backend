const PrismaClient = require('@prisma/client').PrismaClient
const prisma = new PrismaClient()

const saveUser = async (id, attributes, res) => {
  try {
    const {
      first_name,
      last_name,
      image_url,
    } = attributes

    const phone_number = attributes.phone_numbers[0].phone_number;
    const email = (attributes?.email_addresses && attributes.email_addresses.length > 0) ? attributes.email_addresses[0].email_address : null;
    const created_at = new Date(attributes.created_at);
    const updated_at = new Date(attributes.updated_at);

    const existingUser = await prisma.user.findUnique({
      where: { phone_number },
    });

    if (existingUser) {
      console.log("User with the same phone number already exists:", existingUser);
      res.status(409).json({ error: "User with the same phone number already exists" });
      return;
    }

    await prisma.user.create({
      data: {
        id,
        first_name,
        last_name,
        image_url,
        created_at,
        updated_at,
        phone_number,
        email
      },
    });
    res.json({ message: "User synced successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const deleteUserByClerkId = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      console.log("User not found");
      return false;
    }

    await prisma.user.delete({
      where: { id },
    });

    console.log(`User with id ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};

const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
}



module.exports = {
  saveUser,
  deleteUserByClerkId,
  getAllUsers
};

