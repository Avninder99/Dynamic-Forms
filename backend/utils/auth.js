const jwt = require('jsonwebtoken');

module.exports = {
    generateToken: async (id, fullname, email, gender) => {
        try {
            const token = jwt.sign(
                {
                    id,
                    fullname,
                    email,
                    gender
                }, 
                process.env.PRIVATE_KEY, 
                {
                    expiresIn: '1h'
                }
            );
            return token;
        } catch (error) {
            throw new Error('Token generation Error');
        }
    }
}