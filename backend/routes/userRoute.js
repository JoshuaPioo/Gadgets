import express from "express";
import {
  logout,
  login,
  register,
  reverify,
  verify,
  forgotPassword,
  verifyOTP,
  changePassword,
  allUsers,
  getUserbyId,
  updateProfile,
  updatePassword,
  updateProfilePicture,
} from "../controller/UserController.js";

import { isAuthenticated, isAdmin } from "../middleware/isAuthenthicated.js";
import { singleUpload } from "../middleware/multer.js"; 

const router = express.Router();

// AUTH
router.post("/register", register);
router.post("/verify", verify);
router.post("/reverify", reverify);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

// PASSWORD
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp/:email", verifyOTP);
router.post("/change-password/:email", changePassword); // OTP reset
router.put("/update-password", isAuthenticated, updatePassword); // Logged-in change pass

// USER PROFILE
router.put("/update-profile", isAuthenticated, updateProfile);
router.put(
  "/update-profile-picture",
  isAuthenticated,
  singleUpload,
  updateProfilePicture
); 
router.get("/get-user/:userId", getUserbyId);

// ADMIN ONLY
router.get("/all-user", isAuthenticated, isAdmin, allUsers);

export default router;
