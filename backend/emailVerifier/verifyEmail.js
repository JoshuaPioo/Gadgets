import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const verifyEmail = (token, email) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailConfigurations = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Email Verification",
        text: `
        Hi! Please verify your email:
        http://localhost:3000/verify/${token}
        `
    };

    transporter.sendMail(mailConfigurations, (error, info) => {
        if (error) {
            console.error("Email error:", error);
            return;
        }
        console.log("Email Sent Successfully");
        console.log(info);
    });
};
