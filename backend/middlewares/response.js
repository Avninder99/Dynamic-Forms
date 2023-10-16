const Form = require("../models/Form");
const Response = require("../models/Response");

module.exports = {
    responseStructureValidator: async (req, res, next) => {
        try {
            const { response, formId } = req.body;

            const allowedFields = [ 'question', 'id', 'answer', 'options', 'optionsHolder'];
            
            // form ID has been given or not
            if(!formId) {
                return res.status(401).json({
                    message: 'Invalid Request'
                });
            }

            console.log("response - ", response);
            const foundForm = await Form.findById(formId);

            // form exist or not
            if(!foundForm) {
                return res.status(404).json({
                    message: 'Form not found'
                });
            }

            // to check number of fields in responses are equal to the number of fields avaliable in form
            if(response.length !== foundForm.fields.length){
                return res.status(400).json({
                    message: 'Invalid Request'
                });
            }

            // to check only allowed fields are there
            response.forEach((resField, index) => {
                const keys = Object.keys(resField);
    
                keys.forEach((key) => {
                    if(allowedFields.indexOf(key) === -1) {
                        return res.status(400).json({
                            message: 'Invalid Request Structure'
                        })
                    }
                })

                // to check that below 3 conditions are not happening
                if( !resField.question || 
                    ( foundForm.fields[index].isRequired && !resField.answer) || 
                    !resField.id
                ) {
                    return res.status(401).json({
                        message: 'Invalid Request'
                    })
                }
            });

            // to check all fields are in order
            foundForm.fields.forEach((field, index) => {
                if(response[index].id !== field.id) {
                    return res.status(400).json({
                        message: 'Invalid Request'
                    });
                }
            });

            next();

        } catch(error) {
            console.log("response validator - ", error);
            return res.status(500).json({
                message: 'Server Error'
            })
        }
    },
    hasAccess: async (req, res, next) => {
        try {
            const userId = req.body.decoded.id, responseId = req.params.responseId;
    
            const foundResponse = await Response.findById(responseId);
    
            if(!foundResponse){
                return res.status(404).json({
                    message: 'Response not found'
                })
            } 
            
            const foundForm = await Form.findById(foundResponse.submittedToWhichForm);
            
            if(!foundForm) {
                return res.status(404).json({
                    message: 'Form not found'
                })
            }
            else if(
                foundResponse.submittedBy.equals(userId) || 
                foundForm.author.equals(userId) || 
                foundForm.editors.forEach((editor) => {
                    editor.equals(userId)
                })
            ) {
                next();
            }
            return res.status(403).json({
                message: 'Not authorized to perform this operation'
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    }
}