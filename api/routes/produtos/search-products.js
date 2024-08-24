const express = require('express');
const router = express.Router();
const Product = require('../../models/Products');
require("dotenv").config()

router.get('/search-products', async (req, res) => {
    const { query } = req.query;

    try {
        if (!query) {
            return res.status(400).json({ message: "A consulta não pode estar vazia." });
        }

        let produtosEncontrados;

        if (query.length === 1) {
            produtosEncontrados = await Product.find({
                $or: [
                    { product_name: { $regex: `^${query}`, $options: 'i' } }, // Pesquisa por nome começando com a letra
                    { product_code: { $regex: `^${query}`, $options: 'i' } } // Pesquisa por código começando com a letra
                ]
            });
        } else {
            produtosEncontrados = await Product.find({
                $or: [
                    { product_name: { $regex: query, $options: 'i' } }, // Pesquisa por nome (case-insensitive)
                    { product_code: { $regex: query, $options: 'i' } } // Pesquisa por código (case-insensitive)
                ]
            });
        }

        if (produtosEncontrados.length === 0) {
            return res.status(400).json({ message: "Nenhum produto com este nome encontrado." });
        }

        return res.status(200).json({ products: produtosEncontrados });

    } catch (error) {
        console.error('Erro ao pesquisar produtos:', error);
        res.status(500).json({ message: 'Erro ao pesquisar produtos.' });
    }
});

module.exports = router;