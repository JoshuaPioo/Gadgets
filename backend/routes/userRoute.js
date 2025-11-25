import express from 'express';
import { logout,login, register, reverify, verify, forgotPassword, verifyOTP, changePassword, allUsers, isAdmin } from '../controller/UserController.js';
import { isAuthenticated } from '../middleware/isAuthenthicated.js';


const router = express.Router();

router.post('/register', register);
router.post('/verify', verify);
router.post('/reverify', reverify);
router.post('/login', login);
router.post('/logout',isAuthenticated, logout);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp/:email', verifyOTP);
router.post('/change-password/:email', changePassword);
router.post('/login', login);
router.get('/all-user',isAdmin, allUsers);

export default router;