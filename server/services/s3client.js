const multer = require('multer');
const AWS = require('aws-sdk');

let upload = null;
let s3 = null;

const connectS3 = () => {
  if (s3) {
    return { upload, s3 };
  }

  // Multer setup (memory storage for S3)
  upload = multer({ storage: multer.memoryStorage() });

  // AWS
  s3 = new AWS.S3({
    endpoint: `${process.env.SUPABASE_S3_ENDPOINT}`,
    accessKeyId: `${process.env.SUPABASE_ACCESS_KEY}`,
    secretAccessKey: `${process.env.SUPABASE_SECRET_KEY}`,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
    region: 'eu-north-1',
  });

  return { upload, s3 };
};

const getS3 = () => {
  if (!s3) {
    throw new Error('S3 client not initialized. Call connectS3() first.');
  }
  return { upload, s3 };
};

((module.exports = connectS3), getS3);
