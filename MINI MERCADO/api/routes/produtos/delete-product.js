const express = require('express');
const router = express.Router();
const Product = require('../../models/Products');
const authMiddleware = require('../auth/authMiddleware')
require("dotenv").config()

router.delete('/delete-product/:id', authMiddleware, async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.json({ message: 'Produto não encontrado.' });
        }

        res.status(201).json({ message: 'Produto excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir o produto:', error);
        res.status(500).json({ message: 'Erro ao excluir o produto.' });
    }
});

module.exports = router;