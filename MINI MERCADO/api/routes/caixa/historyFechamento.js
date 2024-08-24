const express = require('express');
const router = express.Router();
const Caixa = require('../../models/Caixa');
const HistoricoCaixa = require('../../models/HistoricoCaixa');
const Users = require('../../models/Users');
const isCaixaAberto = require('../caixa/isCaixaAberto');

router.get("/history-fechamento", async (req, res) => {
    try {
        const history = await HistoricoCaixa.find()

        if (history.length === 0) {
            res.status(201).json({ message: "Lista de produtos vazia." })
        } else {
            res.status(200).json({ message: history })
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao reqcuperar a lista de fehchamento." })
    }
})

module.exports = router;