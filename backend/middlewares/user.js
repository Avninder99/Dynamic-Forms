const User = require('../models/User');

module.exports = {
    editorsValidator: async (req, res, next) => {
        try {
            const newEditors = req.body.newEditors;
            // as editors array can be empty
            let valid = true;
            valid = await newEditors.every((editor) => {
                return typeof editor === 'string';
            });

            if(!valid) {
                return res.status(400).json({
                    message: 'Invalid Request'
                });
            }

            // 2 options - search for user with each newEditors id by calling DB everytime
            // or fetch all ids from DB and check if newEditors Id exist in this long id array
            // one relies on indexing and one with JS speed over DB calls
            for(let i=0;i<newEditors.length;i++){
                // const foundUserCount = await User.count({ _id: newEditors[i]});
                // console.log(foundUserCount);

                const foundUser = await User.exists({ _id: newEditors[i]});
                if(!foundUser) {
                    valid = false;
                    break;
                }
            }
            console.log(valid)
            if(!valid) {
                return res.status(400).json({
                    message: 'Invalid Request'
                });
            }
            next();
        }catch(err) {
            console.log(err);
            return res.status(400).json({
                message: 'Invalid Request'
            })
        }
    }
}