// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../model/user');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(403).send('Token is required');

    
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const userId = decoded.user?.id;
        if (!userId) {
            return res.status(403).send('Invalid token payload');
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(403).send('User not found');
        }

        req.auth = {
            userId,
            role: user.role
        };

        next();
    } catch (error) {
        console.error('Invalid token:', error.message);
        res.status(403).send('Invalid token');
    }
};
