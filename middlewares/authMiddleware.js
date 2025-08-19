import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded._id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
}

export const roleBasedAccess = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            return res.status(403).json({ message: 'Not authorized to access this route' });
        }
    }
}