// middlewares/isCaixaAberto.js
const Caixa = require('../../models/Caixa');

const isCaixaAberto = async (req, res, next) => {
    const { operadorId } = req.body; // Supondo que o operadorId é enviado no corpo da requisição
    
    try {
        const caixa = await Caixa.findOne({ 'operador.userId': operadorId, aberto: true });

        if (!caixa) {
            return res.status(400).json({ message: 'Caixa não está aberto.' });
        }

        // Adiciona o caixa ao request para ser utilizado nas rotas
        req.caixa = caixa;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao verificar o status do caixa.' });
    }
};

module.exports = isCaixaAberto;
