import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendOTPMail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // your Gmail
        pass: process.env.MAIL_PASS  // App Password
      },
      tls: {
        rejectUnauthorized: false // ignore self-signed certs in dev
      }
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Your OTP Code for verification",
      text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`,
      html: `<p>Your OTP code is: <b>${otp}</b>. It is valid for 10 minutes.</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully:", info.response);
    return { success: true, info };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return { success: false, error: error.message };
  }
};
