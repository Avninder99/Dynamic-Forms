const { sanitizeEmail, sanitizePassword, sanitizeString } = require('../utils/validation');


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
    isLoggedIn: (req, res, next) => {

    },
    isFormOwner: (req, res, next) => {

    }
}