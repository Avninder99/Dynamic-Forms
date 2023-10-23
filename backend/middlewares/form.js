const Form = require('../models/Form');

module.exports = {
    formStructureValidator: async (req, res, next) => {
        try {
            const { formFields: form, formName } = req.body;
            const allowedFields = [ 'question', 'type', 'id', 'answer', 'isRequired', 'options' ];
            if(!formName) {
                return res.status(401).json({
                    message: 'Invalid Request'
                })
            }
            
            const valid = form.every((field) => {
                const keys = Object.keys(field);
                
                const syntaxValid = keys.every((key) => {
                    return allowedFields.indexOf(key) !== -1;
                })
                if(!syntaxValid) {
                    return false;
                }

                field.answer = [];
    
                if( !field.question || 
                    !field.type || 
                    !field.id || 
                    (
                        (field.type === 'checkboxes' || field.type === 'dropdown' || field.type === 'radioButtons') && 
                        field.options.length === 0
                    ) 
                ) {
                    return false;
                }
                return true;
            });
            if(!valid) {
                console.log("validation error");
                return res.status(400).json({
                    message: 'Invalid Request'
                })
            }
            next();

        } catch(error) {
            console.log("form validator - ", error);
            return res.status(500).json({
                message: 'Server Error'
            })
        }
    },
    isFormOwner: async (req, res, next) => {
        try {
            const { formId } = req.body;
            const userId = req.body.decoded.id;
    
            const foundForm = await Form.findById(formId);
    
            if(!foundForm) {
                return res.status(404).json({
                    message: 'Form not found'
                });
            } else {
                if(foundForm.author.equals(userId)) {
                    next();
                }else {
                    return res.status(403).json({
                        message: 'Not authorized to do this operation'
                    })
                }
            }
        } catch(error) {
            console.log(error)
            return res.status(500).json({
                message: 'Server Error'
            })
        }
    },

    // check if user can edit this form or not, works for both author and editors
    hasEditAccess: async (req, res, next) => {
        try {
            const formId = req.params.id;
            const userId = req.body.decoded.id;
    
            const foundForm = await Form.findById(formId);
    
            if(!foundForm) {
                return res.status(404).json({
                    message: 'Form not found'
                });
            } else {
                if(foundForm.author.equals(userId) || 
                    foundForm.editors.some((editor) => {
                        return editor.equals(userId);
                    })
                ) {
                    next();
                }else {
                    return res.status(403).json({
                        message: 'Not authorized to do this operation'
                    })
                }
            }
        } catch(error) {
            return res.status(500).json({
                message: 'Server Error'
            })
        }
    },

    // check form mode for 'draft'
    formAcceptingChanges: async (req, res, next) => {
        try {
            const formId = req.params.id;
            if(!formId) {
                return res.status().json({
                    message: 'Invalid Request'
                });
            }
            
            const foundForm = await Form.findById(formId);
            if(!foundForm) {
                return res.status(404).json({
                    message: 'form not found'
                });
            }
            if(foundForm.mode !== 'draft') {
                return res.status().json({
                    message: 'Invalid Operation'
                });
            }
            next()
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    },

    // check form mode for 'active'
    formAcceptingResponses: async (req, res, next) => {
        try {
            const { formId } = req.body;
            if(!formId) {
                return res.status().json({
                    message: 'Invalid Request'
                });
            }
            
            const foundForm = await Form.findById(formId);
            if(!foundForm) {
                return res.status(404).json({
                    message: 'form not found'
                });
            }
            if(foundForm.mode !== 'active') {
                return res.status().json({
                    message: 'Invalid Operation'
                });
            }
            next()
        } catch(error) {
            console.log(error);
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    }
}