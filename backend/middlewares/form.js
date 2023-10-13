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
    }
}