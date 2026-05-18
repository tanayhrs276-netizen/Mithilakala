import express from 'express';
import { addAddress, getAddressByUserId } from '../controller/addressController.js';

const router = express.Router();

// add new address
router.post('/add', addAddress);

// get address by user id
router.get('/:userId', getAddressByUserId);

export default router;