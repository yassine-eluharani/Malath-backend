const AWS3 = require("@aws-sdk/client-s3");

const s3Instance = new AWS3.S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

module.exports = { s3Instance };
