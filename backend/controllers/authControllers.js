const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { generateToken } = require("../utils/auth");
const { v4: uuid } = require('uuid');
const { generateVerificationEmail } = require("../utils/mailer");

const authControllers = {
    login: async (req, res) => {
        // inputs are sanitized in middleware and made sure they are avaliable
        try {
            const { email, password } = req.body;
            const foundUser = await User.findOne({ email });
            if(!foundUser) {
                return res.status(401).json({
                    message: 'Invalid User Credentials'
                });
            }
            else if(foundUser && foundUser.isVerified){
                const match = await bcrypt.compare(password, foundUser.password);
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
            }
            else {
                return res.status(409).json({
                    message: 'Please check the email we sent you to verify your account'
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
                
                const slug = uuid();
                const url = `${process.env.FRONTEND_URL}/account-activation/${slug}`;
                const emailSentStatus = await generateVerificationEmail(email, url);
                
                if(!emailSentStatus) {
                    return res.status(500).json({
                        message: 'Server Error'
                    });
                }

                const savedUser = await User.create({
                    fullname,
                    email,
                    password: hashedPassword,
                    gender,
                    accountActivationSlug: slug
                });
                
                if(savedUser){
                    // const token = await generateToken(savedUser._id, savedUser.fullname, savedUser.email, savedUser.gender);
                    return res.status(200).json({
                        message: "Email sent successfully",
                    });
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
    },

    accountActivation: async (req, res) => {
        try {
            const slug = req.params.slug;
            const foundUser = await User.findOne({ accountActivationSlug: slug });

            if(!foundUser) {
                return res.status(404).json({
                    message: 'Invalid activation link'
                });
            }
            else if(foundUser.isVerified) {
                return res.status(409).json({
                    message: 'User has already been verified'
                });
            }
            else {
                foundUser.isVerified = true;
                await foundUser.save();

                const token = await generateToken(foundUser._id, foundUser.fullname, foundUser.email, foundUser.gender);

                return res.status(200).json({
                    message: 'User verified successfully',
                    token
                });
            }
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    },

    googleAuthHandler: async (req, res) => {
        try {
            // console.log("googleAuthHandler", req);
            // console.log({
            //     name: req.user.name.givenName,
            //     email: req.user.emails[0].value,
            //     provider: req.user.provider,
            // });
    
            const email = req.user.emails[0].value, name = req.user.name.givenName, login_type = 'google';
    
            const foundUser = await User.findOne({ email });

            if(!foundUser){
                // dummy password generation
                const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
                const hashedPassword = await bcrypt.hash(uuid(), salt);

                const savedUser = await User.create({
                    fullname: name,
                    email,
                    login_type,
                    password: hashedPassword,
                    isVerified: true,
                });

                if(savedUser){
                    const token = await generateToken(savedUser._id, savedUser.fullname, savedUser.email, savedUser.gender);
                    return res.redirect(`${process.env.FRONTEND_URL}/authHandler/google/oauth20?token=${token}`);
                }else{
                    return res.status(401).json({
                        message: 'Invalid User Credentials'
                    });
                }
            }else {
                const token = await generateToken(foundUser._id, foundUser.fullname, foundUser.email, foundUser.gender);
                return res.redirect(`${process.env.FRONTEND_URL}/authHandler/google/oauth20?token=${token}`);
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    },

    googleAuthFailureHandler: async (req, res) => {
        console.log('google auth failure handler');
        return res.redirect(`${process.env.FRONTEND_URL}/login`);
    }
}

module.exports = authControllers;