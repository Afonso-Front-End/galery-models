const express = require('express');
const router = express.Router();
const Carrinho = require('./../../models/Carrinho');

router.get('/carrinho', async (req, res) => {
    try {
        const carrinho = await Carrinho.findOne();

        if (!carrinho) {
            return res.status(201).json({ message: 'Carrinho vazio.' });
        }

        res.status(200).json({ carrinho });
    } catch (error) {
        console.error('Erro ao obter itens do carrinho:', error);
        res.status(500).json({ message: 'Erro ao obter itens do carrinho.' });
    }
});


module.exports = router;
