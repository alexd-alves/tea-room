// server/routes/upload.js

import express from 'express';
const uploadRoutes = express.Router();
import { uploadFile, deleteFile } from '../controllers/uploadController.js';

import { upload } from '../services/s3client.js';

// POST /api/upload
uploadRoutes.route('/').post(upload.single('file'), uploadFile);

// DELETE /api/upload/:fileKey
uploadRoutes.route('/:fileKey').delete(deleteFile);

export default uploadRoutes;
