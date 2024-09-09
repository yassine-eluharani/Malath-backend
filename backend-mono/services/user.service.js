const PrismaClient = require('@prisma/client').PrismaClient
const prisma = new PrismaClient()

const saveUser = async (attributes) => {
  try {
    const {
      first_name,
      last_name,
      image_url,
    } = attributes

    const id = attributes.id;
    const phone_number = attributes.phone_numbers[0].phone_number;
    const email = (attributes?.email_addresses && attributes.email_addresses.length > 0) ? attributes.email_addresses[0].email_address : null;
    const created_at = new Date(attributes.created_at);
    const updated_at = new Date(attributes.updated_at);

    const existingUser = await prisma.user.findUnique({
      where: { phone_number, id },
    });

    if (existingUser) {
      console.log("User with the same phone number already exists:", existingUser);
      return "User with the same phone number already exists";
    }

    await prisma.user.create({
      data: {
        id,
        first_name,
        last_name,
        profile_picture: image_url,
        created_at,
        updated_at,
        phone_number,
        email
      },
    });

    console.log(`User with id ${id} created successfully`);
    return `User with id ${id} created successfully`

  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user: " + error.message);
  }
};


const deleteUserByClerkId = async (attributes) => {
  try {
    const id = attributes.id;
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      console.log("User not found");
      return "User not found";
    }

    await prisma.user.delete({
      where: { id },
    });

    console.log(`User with id ${id} deleted successfully`);
    return `User with id ${id} deleted successfully`

  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Error deleting user: " + error.message);
  }
};

const updateUserByClerkId = async (attributes) => {
  try {
    const {
      first_name,
      last_name,
      image_url,
    } = attributes

    const id = attributes.id;
    const phone_number = attributes.phone_numbers[0].phone_number;
    const email = (attributes?.email_addresses && attributes.email_addresses.length > 0) ? attributes.email_addresses[0].email_address : null;
    const updated_at = new Date(attributes.updated_at);

    const existingUser = await prisma.user.findUnique({
      where: { phone_number, id },
    });

    if (!existingUser) {
      console.log("User not found");
      return "User not found";
    }

    await prisma.user.update({
      where: { id },
      data: {
        first_name,
        last_name,
        profile_picture: image_url,
        updated_at,
        phone_number,
        email
      },
    });

    console.log(`User with id ${id} updated successfully`);
    return `User with id ${id} updated successfully`

  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user: " + error.message);
  }
}

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
  getAllUsers,
  updateUserByClerkId
};

