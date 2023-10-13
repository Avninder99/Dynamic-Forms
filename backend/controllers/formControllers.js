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
        try {
            const { formFields: form, formName, decoded } = req.body;

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

    }
}

module.exports = formControllers;

