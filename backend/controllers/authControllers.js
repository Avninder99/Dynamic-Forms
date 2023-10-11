const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { generateToken } = require("../utils/auth");

const authControllers = {
    login: async (req, res) => {
        // inputs are sanitized in middleware and made sure they are avaliable
        try {
            const { email, password } = req.body;
            const foundUser = await User.findOne({ email });
            if(foundUser){
                const match = await bcrypt.compare(password, foundUser.password)
                if(match){
                    const token = await generateToken(foundUser._id, foundUser.fullname, email, foundUser.gender);
                    return res.status(200).json({
                        message: "Signed In successfully",
                        token
                    })
                }else{
                    return res.status(401).json({
                        message: 'Invalid User Credentials'
                    });
                }
            }else {
                return res.status(401).json({
                    message: 'Invalid User Credentials'
                });
            }

        } catch (error) {
            return res.status(500).json({
                message: 'Server Error'
            });
        }
        
    },
    register: async (req, res) => {
        // inputs are sanitized in middleware and made sure they are avaliable
        // verify uniqueness of credentials
        try {
            const { fullname, email, password, gender } = req.body;
            const foundUser = await User.findOne({ email });
            if(!foundUser){

                const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
                const hashedPassword = await bcrypt.hash(password, salt);

                const savedUser = await User.create({
                    fullname,
                    email,
                    password: hashedPassword,
                    gender
                });

                if(savedUser){
                    const token = await generateToken(savedUser._id, savedUser.fullname, savedUser.email, savedUser.gender);
                    return res.status(200).json({
                        message: "Signed In successfully",
                        token
                    })
                }else{
                    return res.status(401).json({
                        message: 'Invalid User Credentials'
                    });
                }
            }else {
                return res.status(409).json({
                    message: 'User with this email already exists'
                });
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    }
}

module.exports = authControllers;