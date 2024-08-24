const express = require('express');
const router = express.Router();
const Carrinho = require('../../models/Carrinho');
const Aprazo = require('../../models/Aprazo');

// Rota para adicionar vendas do Aprazo ao Carrinho
router.post('/add-aprazo-to-carrinho', async (req, res) => {
    try {
        // Verifique se há um código de venda na solicitação
        const codigoVenda = req.body.codigo_venda;
        console.log(codigoVenda)
        // console.log(codigoVenda)
        if (!codigoVenda) {
            return res.status(400).json({ error: 'Código de venda não fornecido na solicitação.' });
        }

        // Verifique se o Carrinho está vazio
        const carrinhoExistente = await Carrinho.findOne({ codigo_venda: codigoVenda });

        if (carrinhoExistente && carrinhoExistente.items.length > 0) {
            return res.status(400).json({ error: 'O Carrinho já contém itens. Não é possível adicionar uma venda do Aprazo.' });
        }

        // Encontre a venda do Aprazo com o código de venda específico
        const vendaAprazo = await Aprazo.findOne({ codigo_venda: codigoVenda });

        if (!vendaAprazo) {
            return res.status(404).json({ error: 'Venda do Aprazo não encontrada com o código de venda fornecido.' });
        }

        // Crie um novo Carrinho com a venda do Aprazo
        const carrinhoNovo = new Carrinho({
            codigo_venda: vendaAprazo.codigo_venda,
            username: vendaAprazo.username,
            usercpf: vendaAprazo.usercpf,
            items: vendaAprazo.items.map(item => ({
                product_code: item.product_code,
                product_name: item.product_name,
                product_price: item.product_price,
                quantidade: item.quantidade,
                total: item.valor_total,
                data_venda: vendaAprazo.data_venda
            })),
            subtotal: vendaAprazo.valorTotal,
            valor_recebido: 0
        });

        // Salve o novo Carrinho
        await carrinhoNovo.save();

        res.status(200).json({ message: 'Venda do Aprazo adicionada ao Carrinho com sucesso.' });
    } catch (error) {
        console.error('Erro ao adicionar venda do Aprazo ao Carrinho:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;
