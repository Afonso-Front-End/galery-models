const express = require('express');
const router = express.Router();
const Product = require('../../models/Products');
const authMiddleware = require('../auth/authMiddleware')
require("dotenv").config()

router.get('/list-products', async (req, res) => {
    try {
        const products = await Product.find()

        if (products.length === 0) {
            res.status(201).json({ message: "Lista de produtos vazia." })
        } else {
            res.status(200).json({ products })
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao reqcuperar a lista de produtos." })
    }
})
 

module.exports = router;