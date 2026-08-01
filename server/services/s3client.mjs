import multer from 'multer';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.configDotenv();

// Multer setup (memory storage for S3)
export const upload = multer({ storage: multer.memoryStorage() });

// AWS
export const s3 = new AWS.S3({
    endpoint: process.env.SUPABASE_S3_ENDPOINT,
    accessKeyId: process.env.SUPABASE_ACCESS_KEY,
    secretAccessKey: process.env.SUPABASE_SECRET_KEY,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
    region: 'eu-north-1',
});
