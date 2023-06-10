import express from 'express';
const router = express.Router();
import { getAllChains, getChainById, addNewChain } from '../controllers/chain';

router.get('/', getAllChains);
router.get('/:id', getChainById);
router.post('/create', addNewChain);

export default router;
