const prisma = require('../config/prismaClient');
const { uploadToS3 } = require('../utils/awsUtils');
const { checkIfUserExists } = require('../utils/userUtils');

const getAllListings = async () => {
  try {
    const listings = await prisma.listing.findMany();
    return listings;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);

  }
};

const getListingByUserId = async (user_id) => {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        user_id: user_id
      }
    });
    return listings;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
}

const getListingByListingId = async (listing_id) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listing_id
      }
    });
    return listing;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
}


const newListing = async (body) => {
  try {
    const {
      photos,
      user_id,
      ...otherListingFields
    } = body;

    const userExists = await checkIfUserExists(user_id);

    if (!userExists) {
      return "User not found. Cannot create listing without a valid user."
    }

    const uploadedPhotos = await Promise.all(photos.map(async (photoBase64) => {
      const base64Data = photoBase64.split(',')[1];
      const mimeType = photoBase64.split(';')[0].split(':')[1];

      const fileBuffer = Buffer.from(base64Data, 'base64');

      const s3Url = await uploadToS3(user_id, fileBuffer, mimeType, "malath-test");
      return s3Url;
    }));

    const listing = await prisma.listing.create({
      data: {
        ...otherListingFields,
        user_id,
        photos: uploadedPhotos,
        thumbnail: uploadedPhotos[0]
      },
    });

    return listing;

  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};



module.exports = {
  getAllListings,
  newListing,
  getListingByUserId,
  getListingByListingId
};


