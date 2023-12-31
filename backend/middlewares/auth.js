const jwt = require('jsonwebtoken');
const { sanitizeEmail, sanitizePassword, sanitizeString } = require('../utils/validation');
const Form = require('../models/Form');


module.exports = {
    loginSanitizer: async (req, res, next) => {
        const { email, password } = req.body;
        const sanitizedEmail = sanitizeEmail(email), sanitizedPassword = sanitizePassword(password);
        
        if(sanitizedEmail && sanitizedPassword){
            next();
        }else{
            console.log('auth middlewares login sanitizer');
            return res.status(401).json({
                message: 'Invalid Credentails'
            })
        }
    },
    registerSanitizer: async (req, res, next) => {
        let { email, password, fullname, gender } = req.body;
        const sanitizedEmail = sanitizeEmail(email), sanitizedPassword = sanitizePassword(password);
        fullname = sanitizeString(fullname), gender = sanitizeString(gender);
        
        if(sanitizedEmail && sanitizedPassword && fullname && gender){
            next();
        }else{
            console.log('auth middlewares register sanitizer');
            return res.status(401).json({
                message: 'Invalid Credentails'
            })
        }
    },
    isLoggedIn: async (req, res, next) => {
        try {
            console.log(req.headers);
            const auth_header = req.headers.authorization;
            if(!auth_header){
                return res.status(401).json({
                    message: 'Unauthorized request'
                });
            }
            const token = auth_header.split(' ')[1];
            const decoded = await jwt.verify(token, process.env.PRIVATE_KEY);
            req.body.decoded = decoded;
    
            console.log(decoded);
            next();
        }catch(err) {
            console.log(err);
            return res.status(403).json({
                message: 'Invalid token'
            })
        }
    }
}