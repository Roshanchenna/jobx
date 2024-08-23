const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const User = require("../models/User"); // Adjust the path as needed

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (user) => {
    try {
        const token = jwt.sign(
            { userId: user._id }, // Payload
            process.env.JWT_TOKEN_SECRET_KEY, // Secret key
            { expiresIn: "24h" } // Token expires in 24 hours
        );

        const verificationLink = `${process.env.DOMAIN}:${process.env.FRONTEND_PORT}/verification?token=${token}`;

        const htmlTemplate = fs.readFileSync(path.join(__dirname, "../assets/email-template.html"), "utf8");
        const customizedHtml = htmlTemplate
            .replace(/Jane/g, user.username)
            .replace(/{verification_link}/g, verificationLink);

        const msg = {
            to: user.email,
            from: "noreply@ruthi.in",
            subject: "Email Verification",
            html: customizedHtml,
        };

        await sgMail.send(msg);
        console.log("Verification email sent to:", user.email);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Could not send verification email");
    }
};

const EmailService = {
    sendVerificationEmail,
};

module.exports = EmailService;
