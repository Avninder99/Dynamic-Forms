const Form = require("../models/Form");
const Response = require("../models/Response");
const User = require("../models/User");
const { generateResponseEmail } = require("../utils/mailer");

const responseControllers = {
    fetchResponse: async (req, res) => {
        try {
            const responseId = req.params.responseId;
            const foundResponse = await Response.findById(responseId).populate('submittedToWhichForm', '_id title').lean();
            if(!foundResponse) {
                return res.status(404).json({
                    message: 'Form not found'
                });
            }
            const foundForm = await Form.findById(foundResponse.submittedToWhichForm._id).select('title fields').lean();
            return res.status(200).json({
                message: 'success',
                response: foundResponse,
                form: foundForm
            });
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    },
    // for a single form
    fetchAllResponses: async (req, res) => {
        try {
            const { formId } = req.body;

            const foundResponses = await Response.find({ submittedToWhichForm: formId });

            if(!foundResponses) {
                return res.status(404).json({
                    message: 'Responses not found'
                })
            }
            else if(foundResponses.length === 0) {
                return res.status(200).json({
                    message: 'No responses found for the mentioned form'
                })
            }
            else{
                return res.status(200).json({
                    message: 'success',
                    responses: foundResponses
                });
            }
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    },
    generateResponse: async (req, res) => {
        try {
            const { formId, decoded, response } = req.body;
            const responderId = decoded.id;
            console.log(formId, responderId);

            const foundUser = await User.findById(responderId);
            const foundForm = await Form.findById(formId);

            if(!foundForm || !foundUser) {
                return res.status(404).json({
                    message: 'Not Found'
                });
            }

            const newResponse = await Response.create({
                submittedBy: responderId,
                submittedToWhichForm: formId,
                fields: response
            });

            foundForm.responses.push(newResponse._id);
            await foundForm.save();

            foundUser.myResponses.push(newResponse._id);
            await foundUser.save();

            console.log('response generated');
            // just commented for testing add it back later

            // const responseMailSent = await generateResponseEmail(foundUser.email, foundForm.title);
            // console.log("Was mail sent successfully - ", responseMailSent);

            return res.status(200).json({
                message: 'success',
                responseId: newResponse._id
            });
        } catch(error) {
            console.log(error)
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    },
    fetchMyResponses: async (req, res) => {
        try {
            console.log('here')
            const userId = req.body.decoded.id;
            const foundResponses = await Response.find({ submittedBy: userId }).populate('submittedToWhichForm').lean();

            if(!foundResponses) {
                return res.status(404).json({
                    message: 'Responses not found'
                })
            }
            else{

                for(let i=0;i<foundResponses.length;i++) {
                    foundResponses[i].formTitle = foundResponses[i].submittedToWhichForm.title;
                    foundResponses[i].formId = foundResponses[i].submittedToWhichForm._id;
                    delete foundResponses[i].submittedToWhichForm;
                }

                console.log(foundResponses);
                return res.status(200).json({
                    message: 'success',
                    responses: foundResponses
                });
            }
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    }
}

module.exports = responseControllers;

