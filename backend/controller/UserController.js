import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVerifier/verifyEMail.js";
import { Session } from "../models/sessionModel.js";

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

    const token = jwt.sign({ id: newUser._id}, process.env.SECRET_KEY, { expiresIn: '10m' });
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

export const reverify = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = jwt.sign({ id: user._id}, process.env.SECRET_KEY, { expiresIn: '10m' });
    verifyEmail(token, email);//send verification email

    user.token = token;
    await user.save();
    return res.status(200).json({ 
        message: "Verification email resent successfully",
        success: true,
        token: user.token
     });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (existingUser.isVerified === false) {
        return res.status(403).json({ message: "Email not verified" });
      }

      // Generate JWT token
      const accesstoken = jwt.sign({ id:existingUser._id }, process.env.SECRET_KEY, { expiresIn: '10d' });
      const refreshToken = jwt.sign({ id:existingUser._id }, process.env.SECRET_KEY, { expiresIn: '30d' });

      existingUser.isLoggedIn = true;
      await existingUser.save();

      //check for existing session and delete it
      const existingSession = await Session.findOne({ userId: existingUser._id });
      if (existingSession) {
        await Session.deleteOne({ userId: existingUser._id });
      }


      await Session.create({ userId: existingUser._id });

      return res.status(200).json({ 
        success: true,
        message: `Login successful ${existingUser.firstName}`,
        user : existingUser,
        accesstoken,
        refreshToken
       });
    }catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  /*export const logout = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);

    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
    ;*/

