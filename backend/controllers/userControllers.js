// const Form = require("../models/Form");
// const Response = require("../models/Response");
// const Request = require('../models/Request');
const User = require("../models/User");

const userControllers = {
    fetchMe: async (req, res) => {
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
    },
    fetchUsers: async (req, res) => {
        try {
            console.log(req.query);
            const searchTerm = req.query.search, searcherId = req.body.decoded.id;
            // sanitize search term using proper middlewares
    
            if(searchTerm) {
                const query = { 
                    $and: [
                        {
                            _id: { 
                                $ne: searcherId 
                            }
                        },
                        { 
                            $or: [ 
                                { 
                                    fullname: { 
                                        $regex: searchTerm, 
                                        $options: 'i' 
                                    }
                                }, 
                                { 
                                    email: { 
                                        $regex: searchTerm, 
                                        $options: 'i'
                                    } 
                                } 
                            ] 
                        } 
                    ]
                };
                const foundUsers = await User.find(query).select('fullname email').lean();
    
                if(foundUsers) {
                    return res.status(200).json({
                        message: 'success',
                        users: foundUsers
                    });
                }
            }
            return res.status(200).json({
                message: 'success',
                users: []
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                message: 'Server Error',
                users: []
            });
        }
    }
}

module.exports = userControllers;

