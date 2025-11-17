import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVerifier/verifyEMail.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({email});
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id}, process.env.SECRET_KEY, { expiresIn: '1d' });
    verifyEmail(token, email);//send verification email
    newUser.token = token;
    await newUser.save();
    return res.status(201).json({ 
        message: "User registered successfully",
        success: true,
        user:newUser
     });

  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verify = async (req, res) => {
  try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res.status(401).json({ message: "Authorization token missing or invalid" });
      }

      const token = authHeader.split(" ")[1]; // Bearer <token>
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.SECRET_KEY);
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ message: "Token has expired" });
        }
        return res.status(401).json({ message: "Invalid token" });
      }

      const user = await User.findById(decoded.id);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      user.token = null;
      user.isVerified = true;
      await user.save();

      return res.status(200).json({ 
        message: "Email verified successfully", 
        success: true 
      });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
