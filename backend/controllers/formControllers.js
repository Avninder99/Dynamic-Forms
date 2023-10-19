const Form = require("../models/Form");
const Response = require("../models/Response");
const Request = require('../models/Request');
const User = require("../models/User");

const formControllers = {
    // API -/api/form/generate
    fetchForm: async (req, res) => {
        try {

            const id = req.params.id, page = req.body.page, userId = req.body.decoded.id;
    
            // .select removed the fields that i didn't want to send to frontend
            const foundForm = await Form.findById(id).select('-responses');
            // console.log(foundForm.projection({ title: 1, author: 1, fields: 1 }));
            console.log(foundForm);
    
            if(foundForm){
                console.log(foundForm);
                if(
                    page === 'showPage' || 
                    (
                        page === 'editPage' && 
                        (
                            foundForm.author.equals(userId) ||
                            foundForm.editors.some((editor) => {
                                return editor.equals(userId);
                            })
                        ) 
                    )
                ) {
                    return res.status(200).json({
                        message: 'success',
                        form: foundForm
                    });
                }
                return res.status(403).json({
                    message: 'You are Not Permitted to do this operation'
                });
            }else{
                return res.status(404).json({
                    message: 'Form Not Found'
                });
            }
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    },
    generateForm: async (req, res) => {
        try {
            const { formFields: form, formName, decoded } = req.body;

            const author = decoded.id;

            const foundUser = await User.findById(author);
            if(!foundUser) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            const newForm = await Form.create({
                title: formName,
                author,
                fields: form
            })
            // console.log("new form - ", newForm._id);
            foundUser.createdForms.push(newForm._id);
            await foundUser.save();

            return res.status(200).json({
                message: 'success',
                formId: newForm._id
            })
            
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                message: 'Server Error'
            })
        }
    },

    updateForm: async (req, res) => {
        try {
            const { formId, formFields } = req.body;
            const foundForm = await Form.findById(formId);
    
            if(!foundForm) {
                return res.status(404).json({
                    message: 'Form not found'
                })
            }
    
            foundForm.fields = formFields;
            await foundForm.save();
    
            return res.status(200).json({
                message: 'updated succesfully'
            });
        } catch(error) {
            console.log("form update controller - ", error);
            return res.status(500).json({
                message: 'Server Error'
            })
        }

    },
    deleteForm: async (req, res) => {
        try {
            const formId = req.params.id;
            const foundForm = await Form.findById(formId);
    
            if(!foundForm) {
                return res.status(404).json({
                    message: 'Form not found'
                })
            }
    
            const deletedRes = await foundForm.deleteOne({ _id: formId });
            console.log(deletedRes);

            const deleteResponses = await Response.deleteMany({ submittedToWhichForm: formId });
            console.log(deleteResponses);

            const deleteRequests = await Request.deleteMany({ forWhichForm: formId });
            console.log(deleteRequests);

            return res.status(200).json({
                message: 'updated succesfully'
                // formDeleted: deletedRes
            });
        } catch(error) {
            console.log("form update controller - ", error);
            return res.status(500).json({
                message: 'Server Error'
            })
        }
    },
    fetchAllForms: async (req, res) => {
        try {
            const userId = req.body.decoded.id;
            // .select removed the fields that i didn't want to send to frontend
            const foundForms = await Form.find({ author: userId }).select('-fields').lean();
            console.log(foundForms); 

            
            if(foundForms){
                for(let i=0;i<foundForms.length;i++) {
                    foundForms[i].editors = foundForms[i].editors.length;
                    foundForms[i].responses = foundForms[i].responses.length;
                }
                return res.status(200).json({
                    message: 'success',
                    forms: foundForms
                });
            }else{
                return res.status(404).json({
                    message: 'Forms Not Found'
                });
            }
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    },
    modeSwitch: async (req, res) => {
        try {
            const { id, newMode } = req.params;
            const allowedModes = ['active', 'inactive'];
            if(
                allowedModes.some((mode) => {
                    return mode === newMode;
                })
            ){
                const updateResult = await Form.updateOne({ _id: id }, { mode: newMode });
                if(updateResult.modifiedCount) {
                    return res.status(200).json({
                        message: 'success',
                        mode: newMode
                    });
                } else {
                    return res.status(404).json({
                        message: 'form not found'
                    });
                }
            }
            else {
                return res.status(401).json({
                    message: 'Invalid Request'
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

module.exports = formControllers;

