const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
require("dotenv").config()

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        // O usuário é um administrador, permita o acesso
        next();
    } else {
        // O usuário não é um administrador, negue o acesso
        console.log(req.user)
        res.status(403).json({ message: 'Acesso negado.' });
    }
};

module.exports = router;