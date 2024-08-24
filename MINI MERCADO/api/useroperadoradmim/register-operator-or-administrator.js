const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const cpfCheck = require('cpf-check')
require("dotenv").config()

router.post('/cadastro', async (req, res) => {
    try {
        const { username, useremail, usercpf, role } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Nome não pode estar vazio.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(useremail)) {
            return res.status(400).json({ message: 'Formato de email inválido.' });
        }

        if (!cpfCheck.validate(usercpf)) {
            return res.status(400).json({ message: 'CPF inválido.' });
        }

        const existingUser = await User.findOne({ $or: [{ useremail }, { usercpf }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email ou CPF já cadastrados.' });
        }

        if (!role || !['admin', 'operador'].includes(role)) {
            return res.status(400).json({ message: 'Marque se e Operador ou Admin' });
        }

        const lowerCaseUsername = username.toLowerCase();
        const lowerCaseUseremail = useremail.toLowerCase();

        const newUser = new User({ username: lowerCaseUsername, useremail:lowerCaseUseremail, usercpf, role });
        await newUser.save();

        res.status(200).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
    }
});
module.exports = router;  