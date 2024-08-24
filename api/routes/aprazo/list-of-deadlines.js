const express = require('express');
const router = express.Router();
const Aprazo = require('../../models/Aprazo');

router.get('/lista-aprazo', async (req, res) => {
    try {
        const aprazoList = await Aprazo.find();

        if (aprazoList.length === 0) {
            return res.status(201).json({ message: 'Lista vazia.' });
        }
        
        res.status(200).json(aprazoList);
    } catch (error) {
        console.error('Erro ao obter lista a prazo:', error);
        res.status(500).json({ message: 'Erro ao obter lista a prazo.' });
    }
});
module.exports = router; 