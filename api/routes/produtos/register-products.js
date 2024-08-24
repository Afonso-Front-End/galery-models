const express = require('express');
const router = express.Router();
const Product = require('../../models/Products');
require("dotenv").config()
const authMiddleware = require('../auth/authMiddleware')

router.post('/register-product', authMiddleware, async (req, res) => {
    try {
        const { product_code, product_name, product_price, product_unit } = req.body
        const lowerCaseProductName = product_name.toLowerCase();

        if (product_code === "") {
            return res.status(201).json({ message: "Digite o codigo de barras do produto." })
        }

        const existingCode = await Product.findOne({ $or: [{ product_code }] });
        if (existingCode) {
            return res.status(201).json({ message: `Codigo do produto ${product_code} ja existente.` })
        }

        if (lowerCaseProductName === "") {
            return res.status(201).json({ message: "O nome do produto deve ser prenchido." })
        }

        if (product_code.length <= 5) {
            return res.status(201).json({ message: "Codigo de barra deve conter mais que 5 digitos." })
        }

        if (product_price === "") {
            return res.status(201).json({ message: "O preco do produto deve ser preenchido." })
        }

        if (product_unit === "") {
            return res.status(201).json({ message: "A quantidade do produto deve ser informada." })
        }

        const existingName = await Product.findOne({ $or: [{ lowerCaseProductName }] })
        if (existingName) {
            return res.status(201).json({ message: `Nome do produto ${lowerCaseProductName} ja existente.` })
        }

        const newProduct = new Product({ product_code, product_name: lowerCaseProductName, product_price, product_unit });
        await newProduct.save()

        res.status(200).json({ message: `Produto ${lowerCaseProductName} cadastrado com sucesso.` })

    } catch (error) {
        res.status(500).json({ message: "Erro ao registrar produto no banco de dados." })
    }
})


module.exports = router;