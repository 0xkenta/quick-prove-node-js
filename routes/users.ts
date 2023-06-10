import express from 'express';
const router = express.Router();
import { addChainToWatchlist, createUser, getAllUsers } from '../controllers/user';

router.get('/', getAllUsers);
router.post('/create', createUser);
router.patch('/:id', addChainToWatchlist);

export default router;
