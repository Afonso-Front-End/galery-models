const express = require('express');
const router = express.Router();
const Product = require('../../models/Products');
const Carrinho = require('../../models/Carrinho');
const isCaixaAberto = require('../caixa/isCaixaAberto');
const Decimal128 = require("decimal.js")

router.post('/to-ad-cart-scaner', isCaixaAberto, async (req, res) => {
    try {
        const { username, usercpf, barcode } = req.body;
        const produto = await Product.findOne({ product_code: barcode });

        if (!produto) {
            return res.status(201).json({ message: `Produto com o codigo (${barcode}) não encontrado.` });
        }

        if (produto.product_unit < 1) {
            return res.status(400).json({ message: 'Estoque insuficiente para adicionar o produto.' });
        }

        let carrinho = await Carrinho.findOne({ username, usercpf });

        if (!carrinho) {
            carrinho = new Carrinho({
                username,
                usercpf,
                items: [],
            });
        }

        const existingItemIndex = carrinho.items.findIndex(item => item.product_code === produto.product_code);

        if (existingItemIndex !== -1) {
            carrinho.items[existingItemIndex].quantidade += 1;
            carrinho.items[existingItemIndex].total = carrinho.items[existingItemIndex].product_price * carrinho.items[existingItemIndex].quantidade;
        } else {
            carrinho.items.push({
                product_code: produto.product_code,
                product_name: produto.product_name,
                product_price: produto.product_price,
                product_unit: produto.product_unit,
                quantidade: 1,
                total: produto.product_price * 1
            });
        }

        carrinho.subtotal = parseFloat(carrinho.items.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2));
        carrinho.subtotalvenda = parseFloat(carrinho.items.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2));

        await carrinho.save();
        produto.product_unit -= 1;
        await produto.save();

        res.status(200).json({ message: 'Produto adicionado ao carrinho com sucesso.' });
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
        res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho.' });
    }
});


module.exports = router;