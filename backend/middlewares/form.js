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

            form.forEach((field) => {
                const keys = Object.keys(field);
    
                keys.forEach((key) => {
                    if(allowedFields.indexOf(key) === -1) {
                        return res.status(400).json({
                            message: 'Invalid Request Structure'
                        })
                    }
                })
                field.answer = [];
    
                if( !field.question || 
                    !field.type || 
                    !field.id || 
                    (
                        (field.type === 'checkboxes' || field.type === 'dropdown' || field.type === 'radioButtons') && 
                        field.options.length === 0
                    ) 
                ) {
                    return res.status(401).json({
                        message: 'Invalid Request'
                    })
                }
            });

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
            return res.status(500).json({
                message: 'Server Error'
            })
        }
    },
    hasEditAccess: async (req, res, next) => {
        try {
            const { formId } = req.body;
            const userId = req.body.decoded.id;
    
            const foundForm = await Form.findById(formId);
    
            if(!foundForm) {
                return res.status(404).json({
                    message: 'Form not found'
                });
            } else {
                if(foundForm.author.equals(userId) || 
                    foundForm.editors.some((editor) => {
                        editor.equals(userId);
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
    }
}