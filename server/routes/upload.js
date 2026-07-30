// server/routes/upload.js
const express = require('express');
const getS3 = require('../services/s3client.js');
const uploadRoutes = express.Router();
const { uploadFile } = require('../controllers/uploadController.js');

const { upload } = getS3();

// POST /api/upload
uploadRoutes.route('/').post(upload.single('file'), uploadFile);

module.exports = uploadRoutes;
