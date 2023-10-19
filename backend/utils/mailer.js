const mailer = require('nodemailer');
/*
    Used to send emails to new user to verify their email address
*/
module.exports = {
    generateVerificationEmail: async (userEmail, link) => {
        try {
            let config = {
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            }
            let message = {
                from: process.env.EMAIL,
                to: userEmail,
                subject: 'Dynamic Forms Verification Email',
                html: `<a>${link}</a>`
            }
            let transporter = mailer.createTransport(config);
            console.log("Email - ", userEmail);
            const res = await transporter.sendMail(message);
            console.log(res);
            return true;
        } catch(err) {
            console.log('Email error');
            console.log(err);
            return false;
        }
    },
    generateResponseEmail: async (email, formName) => {
        try {
            let config = {
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            }
            let message = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Dynamic Forms Response Email',
                html: `<h3>You have successfully submitted your response to ${formName}</h3>`
            }
            let transporter = mailer.createTransport(config);
            console.log("Email - ", email);
            const res = await transporter.sendMail(message);
            console.log(res);
            return true;
        } catch(err) {
            console.log('Email error');
            console.log(err);
            return false;
        }
    }
}