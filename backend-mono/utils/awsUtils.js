const AwsClient = require("../config/AWSconfig");
const AWS3 = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require('uuid');

const uploadToS3 = async (user_id, fileBuffer, mimeType, bucket) => {
  if (!fileBuffer || !mimeType) {
    throw new Error("Invalid file data");
  }

  const key = `images/${user_id}/${uuidv4()}`; // Create unique file name
  const uploadParams = {
    Key: key,
    Bucket: bucket,
    Body: fileBuffer,
    ContentType: mimeType,
    ACL: 'public-read',
  };

  const command = new AWS3.PutObjectCommand(uploadParams);
  const response = await AwsClient.s3Instance.send(command);

  if (response.$metadata.httpStatusCode === 200) {
    const s3Url = `https://${bucket}.s3.amazonaws.com/${key}`;
    return s3Url;
  } else {
    throw new Error("Upload Failed");
  }
};

module.exports = { uploadToS3 };

