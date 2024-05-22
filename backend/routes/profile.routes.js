import express from 'express';
import { editProfile, smeetCount, addAvatar, uploadCoverImage } from '../controllers/profile.controller.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.put('/edit/:username', editProfile);
router.get('/smeetCount/:username', smeetCount);
router.put('/avatar/:username', upload.array('avatar', 1), addAvatar);
router.post('/uploadCover/:username', upload.array('cover', 1), uploadCoverImage);

export default router;