const validator = require('validator');

module.exports = {
    sanitizeEmail: (email) => {
        try {
            let sanitizedEmail = validator.escape(email);
            
            if(sanitizedEmail && validator.isEmail(sanitizedEmail)){
                sanitizedEmail = validator.trim(sanitizedEmail);
                sanitizedEmail = validator.normalizeEmail(sanitizedEmail);
                return sanitizedEmail;
            }
            return '';
        } catch (error) {
            console.log(error);
            return '';
        }
    },

    sanitizePassword: (password) => {
        try {
            if(password){
                let sanitizedPassword = validator.escape(password);
                sanitizedPassword = validator.trim(sanitizedPassword);
                return sanitizedPassword;
            }
            return '';
        } catch (error) {
            console.log(error);
            return '';
        }
    },

    sanitizeString: (string) => {
        try {
            if(string){
                let sanitizedString = validator.escape(string);
                sanitizedString = validator.trim(sanitizedString);
                return sanitizedString;
            }
            return '';
        } catch (error) {
            console.log(error);
            return '';
        }
    }
}