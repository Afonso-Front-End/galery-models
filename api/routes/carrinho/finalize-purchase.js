const express = require('express');
const router = express.Router();
const Carrinho = require('../../models/Carrinho');
const Venda = require('../../models/Venda');
const Caixa = require('../../models/Caixa');
const Decimal = require('decimal.js');

router.post('/finalizar-compra', async (req, res) => {
    try {
        const { valorPago, tipoPagamento, operadorId } = req.body;

        // Verificar se o tipo de pagamento é válido
        const tiposValidos = ['credito', 'debito', 'dinheiro', 'pix'];
        if (!tiposValidos.includes(tipoPagamento)) {
            return res.status(400).json({ message: 'Informe um tipo de pagamento válido.' });
        }

        // Verificar se o valor pago é válido
        if (isNaN(valorPago) || valorPago <= 0) {
            return res.status(400).json({ message: 'O valor do pagamento deve ser informado.' });
        }

        // Buscar o carrinho do usuário
        const carrinho = await Carrinho.findOne({});

        // Verificar se o carrinho existe
        if (!carrinho) {
            return res.status(404).json({ message: 'Carrinho não encontrado.' });
        }

        // Calcular o subtotal do carrinho
        const subtotal = carrinho.subtotal;

        // Verificar se o valor pago é suficiente
        if (valorPago < parseFloat(subtotal)) {
            carrinho.subtotal = parseFloat(carrinho.subtotal) - valorPago;
            carrinho.pagamentos.push({ valorPago, tipoPagamento });
            await carrinho.save();
            return res.status(201).json({ message: 'Valor pago registrado com sucesso.' });
        }

        // Verificar se o tipo de pagamento é crédito, débito ou pix e se o valor pago é maior que o subtotal
        if (['credito', 'debito', 'pix'].includes(tipoPagamento) && valorPago > parseFloat(subtotal)) {
            return res.status(400).json({ message: 'Pagamentos em crédito, débito e PIX não retornam troco.' });
        }

        // Calcular o troco
        const troco = Decimal(valorPago - parseFloat(subtotal));

        // Atualizar os pagamentos e o troco no carrinho
        carrinho.subtotal = 0;
        carrinho.pagamentos.push({ valorPago, tipoPagamento });
        carrinho.troco = troco;

        // Salvar as alterações no carrinho
        await carrinho.save();

        // Se o subtotal for menor ou igual a zero, criar um registro na tabela de Venda.
        if (carrinho.subtotal <= 0) {
            const novaVenda = new Venda({
                items: carrinho.items.map(item => ({
                    product_code: item.product_code,
                    product_name: item.product_name,
                    product_price: item.product_price,
                    quantidade: item.quantidade,
                    valor_total: item.total
                })),
                codigo_venda: carrinho.codigo_venda,
                username: carrinho.username,
                usercpf: carrinho.usercpf,
                valorTotal: carrinho.subtotal,
                subtotalvenda: carrinho.subtotalvenda,
                pagamentos: carrinho.pagamentos,
                data_venda: new Date(),
                troco: carrinho.troco
            });

            const caixa = await Caixa.findOne({ 'operador.userId': operadorId, aberto: true });

            if (caixa) {
                // Atualizar os campos necessários do caixa existente
                caixa.totalVendas = parseFloat(caixa.totalVendas) + parseFloat(carrinho.subtotalvenda);

                // Adicionar os itens ao caixa
                const venda = {
                    codigo_venda: carrinho.codigo_venda,
                    items: carrinho.items.map(item => ({
                        product_code: item.product_code,
                        product_name: item.product_name,
                        product_price: item.product_price,
                        quantidade: item.quantidade,
                        valor_total: item.total
                    })),
                    pagamentos: carrinho.pagamentos,
                    troco: carrinho.troco
                };
                caixa.items.push(venda);

                await caixa.save();
            }

            await novaVenda.save();
            await Carrinho.findByIdAndDelete(carrinho._id);
        }

        res.status(200).json({ message: 'Compra finalizada com sucesso.', troco: troco });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao finalizar a compra.' });
    }
});

module.exports = router;
