// const Form = require("../models/Form");
// const Response = require("../models/Response");
// const Request = require('../models/Request');
const User = require("../models/User");

const userControllers = {
    fetchUser: async (req, res) => {
        try {
            const id = req.body.decoded.id;
            const foundUser = await User.findById(id).select("-password -accountActivationSlug").lean();
    
            if(!foundUser) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
    
            foundUser.createdForms = foundUser.createdForms.length;
            foundUser.myResponses = foundUser.myResponses.length;
    
            return res.status(200).json({
                message: 'success',
                user: foundUser
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    }
}

module.exports = userControllers;

