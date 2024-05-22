import express from 'express';
import { getSmeets, getUserSmeets, deleteSmeet, getSingleSmeet, editSmeet, postSmeet, uploadSmeetImg } from '../controllers/smeet.controller.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.get('/', getSmeets);
router.get('/getSmeets/:username', getUserSmeets);
router.get('/getSmeet/:id', getSingleSmeet);
router.put('/editSmeet/:id', editSmeet);
router.post('/postSmeet', postSmeet);
router.post('/uploadSmeetImg', upload.array('cover', 1), uploadSmeetImg);
router.get('/deleteSmeet/:id', deleteSmeet);

export default router;