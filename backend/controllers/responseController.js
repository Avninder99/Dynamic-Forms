const Response = require("../models/Response");

const responseControllers = {
    fetchResponse: async (req, res) => {
        try {
            
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

            const newResponse = await Response.create({
                submittedBy: responderId,
                submittedToWhichForm: formId,
                fields: response
            });

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

