import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const secretKey = 'moviemart';
        const decoded = jwt.verify(token, secretKey);
        req.body.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).send({
            success: false,
            message: 'Invalid token',
        });
    }
}

export default authMiddleware;