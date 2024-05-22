import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUsers, getUserInfo } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:username', getUserInfo);

export default router;
