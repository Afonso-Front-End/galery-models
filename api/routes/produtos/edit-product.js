const express = require('express');
const router = express.Router();
const Product = require('../../models/Products');
const authMiddleware = require('../auth/authMiddleware')

require("dotenv").config()

router.put('/edit-product/:id', authMiddleware, async (req, res) => {
    const productId = req.params.id;
    const { product_name, product_price, product_unit } = req.body;

    try {

        const existingProduct = await Product.findById(productId);

        const fieldsChanged =
            existingProduct.product_name !== product_name ||
            existingProduct.product_price.toString() !== product_price.toString() ||
            existingProduct.product_unit !== product_unit;

        if (!fieldsChanged) {
            return res.status(201).json({ message: 'Nenhum produto foi alterado.' });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { product_name, product_price, product_unit },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(400).json({ message: 'Produto não encontrado.' });
        }
        console.log('Produto atualizado com sucesso.')
        res.status(200).json({ message: 'Produto atualizado com sucesso.', updatedProduct });
    } catch (error) {
        console.error('Erro ao editar o produto:', error);
        res.status(500).json({ message: 'Erro ao editar o produto.' });
    }
});

module.exports = router;
