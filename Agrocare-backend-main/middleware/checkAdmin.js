// middleware/checkAdmin.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const checkAdmin = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed" });
    }
};

module.exports = checkAdmin;
