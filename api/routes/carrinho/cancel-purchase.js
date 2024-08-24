const express = require('express');
const router = express.Router();
const Product = require('../../models/Products');
const Carrinho = require('../../models/Carrinho');
const Venda = require('../../models/Venda');
const Aprazo = require('../../models/Aprazo');

router.delete('/cancelar-compra', async (req, res) => {
    try {
        // Buscar todos os carrinhos
        const carrinhos = await Carrinho.find();

        for (const carrinho of carrinhos) {
            // Verificar se o código de venda do carrinho corresponde a uma venda do Aprazo
            const vendaAprazo = await Aprazo.findOne({ codigo_venda: carrinho.codigo_venda });

            if (vendaAprazo) {
                // Limpar o carrinho sem retornar os produtos ao estoque
                await Carrinho.findOneAndDelete({ codigo_venda: carrinho.codigo_venda });
            } else {
                // Retornar os produtos ao estoque
                for (const item of carrinho.items) {
                    const product = await Product.findOne({ product_code: item.product_code });

                    if (product) {
                        product.product_unit += item.quantidade;
                        await product.save();
                    } else {
                        console.error(`Produto com código ${item.product_code} não encontrado.`);
                    }
                }

                // Remover o carrinho
                await Carrinho.findOneAndDelete({ codigo_venda: carrinho.codigo_venda });

                // Remover a venda correspondente
                const vendaCancelada = await Venda.findOneAndDelete({ codigo_venda: carrinho.codigo_venda });

                if (!vendaCancelada) {
                    console.error(`Venda com código ${carrinho.codigo_venda} não encontrada.`);
                }
            }
        } 

        res.status(200).json({ message: 'Compra cancelada com sucesso. Itens retornados ao estoque.' });
    } catch (error) {
        console.error('Erro ao cancelar compra:', error);
        res.status(500).json({ message: 'Erro ao cancelar compra.' });
    }
});

module.exports = router;
