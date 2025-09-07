import express from 'express';
import auth from '../middlewares/auth.js';
import { createItem, getItems, updateItem, deleteItem } from '../controllers/itemController.js';

const router = express.Router();

router.post('/', auth, createItem);
router.get('/', auth, getItems);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);

export default router;
