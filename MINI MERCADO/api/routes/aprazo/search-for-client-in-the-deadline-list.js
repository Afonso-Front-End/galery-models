const express = require('express');
const router = express.Router();
const Aprazo = require('../../models/Aprazo');

router.get('/search-client', async (req, res) => {
    const { query } = req.query;
    console.log(query)
    try {
        if (!query) {
            return res.status(201).json({ message: "A consulta não pode estar vazia." });
        }

        // Verificar se o query é um CPF
        const isCPF = /^\d{11}$/.test(query);

        let cliente;

        if (isCPF) {
            // Pesquisar pelo CPF do cliente e populando os dados da venda
            cliente = await Aprazo.find({ "cliente.clienteCpf": query }).populate('items');
        } else {
            // Pesquisar pelo nome do cliente e populando os dados da venda
            cliente = await Aprazo.find({ "cliente.clienteName": { $regex: query, $options: 'i' } }).populate('items');
        }

        if (cliente.length === 0) {
            return res.status(201).json({ message: "Nenhuma venda encontrada para este cliente." });
        }

        return res.status(200).json({ message: cliente });

    } catch (error) {
        console.error('Erro ao pesquisar vendas:', error);
        res.status(500).json({ message: 'Erro ao pesquisar vendas.' });
    }
});

module.exports = router; 
