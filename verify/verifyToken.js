const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = function auth (req, res, next){
    const token = req.header('auth-token');
    //if(!token) return res.status(401).send('Acces Denied!');
    if(!token){
        return next(createError(400, 'Acces Denied!'));
        next();
    }

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
            return next(createError(400, 'Invalid Token!'));
            next();
    }
}