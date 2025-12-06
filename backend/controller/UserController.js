import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVerifier/verifyEmail.js";
import { Session } from "../models/sessionModel.js";
import { sendOTPMail } from "../emailVerifier/sendOTPMail.js";

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

  export const logout = async (req, res) => {
    try {
      const userId = req.id;
      await Session.deleteMany({ userId:userId });
      await User.findByIdAndUpdate(userId, { isLoggedIn: false });
      return res.status(200).json({ 
        success: true,
        message: "Logout successful"
       });

    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    };


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();
    await sendOTPMail(email, otp);

    return res.status(200).json({
      message: "OTP sent to email successfully",
      success: true
    });

  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
  const { otp } = req.body;
  const email = req.params.email;

  if (!otp) {
    return res.status(400).json({ message: "OTP is required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // FIX: Wrong condition removed
  if (!user.otp) {
    return res.status(400).json({ message: "No OTP found or already used" });
  }

  if (user.otpExpiry < new Date()) {
    return res.status(400).json({ message: "OTP has expired" });
  }

  if (otp !== user.otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // OTP verified - clear it
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  return res.status(200).json({
    message: "OTP verified successfully",
    success: true
  });
} catch (error) {
  console.error("Error in OTP verification:", error);
  res.status(500).json({ message: "Internal server error" });
}
};

export const changePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if any field is empty
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
      success: true
    });

  } catch (error) {
    console.error("Error in changePassword:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      users
    });
    
    
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserbyId = async (req, res) => {
  try {
    const {userId} = req.params;
    const user = await User.findById(userId).select("-password -otp -otpExpiry -token");
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

