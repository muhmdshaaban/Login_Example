const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const token = req.header('x-auth-token');
        if (token) {
            const userdata = jwt.verify(token, 'mysecretkey');
            if (userdata) {
                req.user = userdata;
                next();
            } else {
                res.status(400).send({ message: 'Invalid token' });
            }
        } else {
            res.status(401).send({ message: 'Token not provided' });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }

}
module.exports = auth;