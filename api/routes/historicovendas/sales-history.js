const express = require('express');
const router = express.Router();
const Venda = require('../../models/Venda');

// Rota para listar vendas filtradas por tipo de pagamento
// router.get('/list-history/:tipoPagamento?', async (req, res) => {
//     const { tipoPagamento } = req.params;

//     try {
//         let historico;

//         if (!tipoPagamento) {
//             // Se nenhum tipo de pagamento for especificado, retornar todo o histórico de vendas
//             historico = await Venda.find();
//         } else {
//             // Filtrar as vendas pelo tipo de pagamento especificado
//             if (tipoPagamento === 'dinheiro' || tipoPagamento === 'credito' || tipoPagamento === 'debito' || tipoPagamento === 'pix') {
//                 historico = await Venda.find({
//                     'pagamentos': { $size: 1 }, // Apenas uma forma de pagamento
//                     'pagamentos.tipoPagamento': tipoPagamento
//                 });
//             } else {
//                 historico = await Venda.find({
//                     'pagamentos.tipoPagamento': tipoPagamento
//                 });
//             }
//         }

//         // Ordenar vendas por data
//         historico.sort((a, b) => new Date(a.data_venda.$date) - new Date(b.data_venda.$date));

//         if (historico.length === 0) {
//             if (tipoPagamento) {
//                 return res.status(201).json({ message: `Não foram encontradas vendas com pagamento do tipo ${tipoPagamento}.` });
//             } else {
//                 return res.status(201).json({ message: "Não foram encontradas vendas." });
//             }
//         } else {
//             return res.status(200).json({ historico });
//         }
//     } catch (error) {
//         console.error("Erro ao recuperar a lista de vendas:", error);
//         res.status(500).json({ message: "Erro ao recuperar a lista de vendas." });
//     }
// });

router.get('/list-history/:tipoPagamento?', async (req, res) => {
    const { tipoPagamento } = req.params;

    try {
        let historico;

        if (!tipoPagamento) {
            // Se nenhum tipo de pagamento for especificado, retornar todo o histórico de vendas
            historico = await Venda.find();
        } else {
            // Se houver uma combinação de tipos de pagamento especificada
            if (tipoPagamento.includes('-')) {
                const tipos = tipoPagamento.split('-');

                // Filtrar as vendas para combinações de tipos de pagamento
                historico = await Venda.find({
                    $and: tipos.map(tipo => ({
                        'pagamentos.tipoPagamento': tipo
                    }))
                });
            } else {
                // Filtrar as vendas pelo tipo de pagamento especificado (apenas um tipo)
                historico = await Venda.find({
                    'pagamentos': { $size: 1 }, // Apenas uma forma de pagamento
                    'pagamentos.tipoPagamento': tipoPagamento
                });
            }
        }

        // Ordenar vendas por data
        historico.sort((a, b) => new Date(a.data_venda.$date) - new Date(b.data_venda.$date));

        if (historico.length === 0) {
            if (tipoPagamento) {
                return res.status(201).json({ message: `Não foram encontradas vendas com pagamento do tipo ${tipoPagamento}.` });
            } else {
                return res.status(201).json({ message: "Não foram encontradas vendas." });
            }
        } else {
            return res.status(200).json({ historico });
        }
    } catch (error) {
        console.error("Erro ao recuperar a lista de vendas:", error);
        res.status(500).json({ message: "Erro ao recuperar a lista de vendas." });
    }
});




module.exports = router;
