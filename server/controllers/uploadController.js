// server/controllers/uploadController.js

const { getS3 } = require('../services/s3client.mjs');
const path = require('path');

const { s3 } = require('../services/s3client.mjs');

// @desc Upload file
// @route POST /api/upload
// @access Public
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const bucketName = 'flowers';
    const fileKey = `${Date.now()}_${path.basename(req.file.originalname)}`;

    // Upload to Supabase S3
    await s3
      .putObject({
        Bucket: bucketName,
        Key: fileKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
      .promise();

    // Respond w/ file info
    res.json({
      message: 'File uploaded successfully',
      fileKey,
      publicUrl: `${process.env.SUPABASE_PUBLIC_URL}/storage/v1/object/public/${bucketName}/${fileKey}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Delete file
// @route DELETE /api/upload/:fileKey
// @access Public
const deleteFile = async (req, res) => {
  try {
    const { fileKey } = req.params;
    const bucketName = 'flowers';

    await s3
      .deleteObject({
        Bucket: bucketName,
        Key: fileKey,
      })
      .promise();

    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadFile,
  deleteFile,
};
