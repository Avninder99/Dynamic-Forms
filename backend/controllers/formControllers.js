
const formControllers = {
    // API -/api/form/generate
    fetchForm: async (req, res) => {
        return res.status(200).json({
            message: "success"
        })
    },
    generateForm: async (req, res) => {
        console.log(req.body);

        return res.status(200).json({
            message: "success"
        })
    }
}

module.exports = formControllers;

