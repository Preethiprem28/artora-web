const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
async function sendRegistrationEmail(
    userEmail,
    userName
) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Welcome to ARTORA - Registration Successful",
        text:
            `Hello ${userName},

Your registration with ARTORA was successful!

Welcome to ARTORA - Online Art and Handmade Marketplace.

You can now login and explore our collection of paintings, pottery, jewelry and handmade crafts.

Thank you for joining ARTORA!

Regards,
ARTORA Team`

    };
    await transporter.sendMail(mailOptions);
    console.log(
        "Registration email sent successfully"
    );
}
module.exports = sendRegistrationEmail;