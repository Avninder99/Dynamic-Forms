const Form = require("../models/Form");

const formControllers = {
    // API -/api/form/generate
    fetchForm: async (req, res) => {
        try {
            const id = req.params.id;
    
            // .select removed the fields that i didn't want to send to frontend
            const foundForm = await Form.findById(id).select('-editors -responses');
            // console.log(foundForm.projection({ title: 1, author: 1, fields: 1 }));
            console.log(foundForm);
    
            if(foundForm){
                console.log(foundForm);
                return res.status(200).json({
                    message: 'success',
                    form: foundForm
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
        // check form structure replace answer string with empty array
        try {
            // console.log(req.body);
            
            const { formFields: form, formName, decoded } = req.body;
            const allowedFields = [ 'question', 'type', 'id', 'answer', 'isRequired', 'options' ];
            if(!formName) {
                return res.status(401).json({
                    message: 'Invalid Request1'
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
                        message: 'Invalid Request2'
                    })
                }
            });

            const author = decoded.id;
            const newForm = await Form.create({
                title: formName,
                author,
                fields: form
            })

            return res.status(200).json({
                message: "success",
                formId: newForm._id
            })
            
        } catch(error) {
            console.log(error)
            return res.status(500).json({
                message: 'Server Error'
            });
        }
    }
}

module.exports = formControllers;

