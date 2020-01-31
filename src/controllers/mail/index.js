const nodemailer = require("nodemailer");
const emailConfirmationTemplate = require("./emailTemplate");

module.exports = {
    sendConfirmation: async (email, confirmationCode) => {
        try {
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.USER_NODEMAILER,
                    pass: process.env.PASSWORD_NODEMAILER
                }
            });
            await transporter.sendMail({
                from: process.env.USER_NODEMAILER,
                to: email,
                subject: "Email Confirmation",
                text:
                    "Copie y pegue la siguiente url para confirmar / Copy and paste the following URL in order to confirm your subscription: http://localhost:3000/users/codeconfirmation/${confirmationCode}",
                html: emailConfirmationTemplate({ email, confirmationCode })
            });
            return true;
        } catch (error) {
            throw error;
        }
    }
};
