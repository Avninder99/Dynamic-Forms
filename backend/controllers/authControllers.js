const User = require("../models/User");

const authControllers = {
    login: async (req, res) => {
        // sanitize inputs in middleware

        const { fullname, email, password, gender } = req.body;
        const newUser = User.c

    },
    register: async (req, res) => {

    }
}

module.exports = authControllers;