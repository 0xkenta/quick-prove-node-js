import express from 'express';
const router = express.Router();
import { addNewToken, getAllTokens, getTokenById } from '../controllers/token';

router.get('/', getAllTokens);
router.get('/:id', getTokenById);
router.post('/create', addNewToken);

export default router;
