import express from 'express'

import { getProdutos, addProdutos, updateProdutos, deleteProduto } from '../controllers/produto.js'; // criar depois

const router = express.Router();

router.get('/', getProdutos);

router.post('/', addProdutos);

router.put("/:id", updateProdutos);

router.delete("/:id", deleteProduto);

export default router