const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const cpfCheck = require('cpf-check')

require("dotenv").config()

router.post('/login', async (req, res) => {
    try {
        const { username, usercpf } = req.body;
        
        if (!username) {
            return res.status(400).json({ message: 'Nome não pode estar vazio.' });
        }

        if (!cpfCheck.validate(usercpf)) {
            return res.status(400).json({ message: 'CPF inválido.' });
        }

        const lowerCaseUsername = username.toLowerCase();

        const user = await User.findOne({ username: lowerCaseUsername, usercpf });

        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado.' });
        }

        const payload = {
            userId: user._id,
            username: user.username,
            usercpf: user.usercpf,
            role: user.role
        };

        const userdata = { ...payload, ...user };

        const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '10h' });

        res.status(200).json({ message: 'Login bem-sucedido!', token, userdata });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao realizar o login.' });
    }
});

module.exports = router;