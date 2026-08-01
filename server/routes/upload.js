// server/routes/upload.js

const express = require('express');
const getS3 = require('../services/s3client.mjs');
const uploadRoutes = express.Router();
const { uploadFile, deleteFile } = require('../controllers/uploadController.js');

const { upload } = require('../services/s3client.mjs');

// POST /api/upload
uploadRoutes.route('/').post(upload.single('file'), uploadFile);

// DELETE /api/upload/:fileKey
uploadRoutes.route('/:fileKey').delete(deleteFile);

module.exports = uploadRoutes;
