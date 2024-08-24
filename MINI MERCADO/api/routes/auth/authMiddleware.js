const jwt = require('jsonwebtoken');
const User = require('../../models/Users');
const jwt_secret = process.env.JWT_SECRET


const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
        return res.status(401).json({ message: 'Acesso não autorizado. Token de autenticação não fornecido.' });
    }
    
    try {
        const decoded = jwt.verify(token, jwt_secret);
        const userId = decoded.payload.userId;
        const user = await User.findById(userId);
    
        if (!user) {
            return res.status(401).json({ message: 'Acesso não autorizado. Usuário não encontrado.' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Acesso não autorizado.' });
        }
       
        req.user = user;
        next();
    } catch (error) {
        console.error('Erro de autenticação:', error);
        return res.status(401).json({ message: 'Acesso não autorizado. Falha na autenticação.' });
    } 
};

module.exports = authMiddleware;
