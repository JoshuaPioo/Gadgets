import express from 'express';
import { logout,login, register, reverify, verify, forgotPassword, verifyOTP, changePassword, allUsers } from '../controller/UserController.js';
import { isAdmin, isAuthenticated } from '../middleware/isAuthenthicated.js';


const router = express.Router();

router.post('/register', register);
router.post('/verify', verify);
router.post('/reverify', reverify);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp/:email', verifyOTP);
router.post('/change-password/:email', changePassword);

router.get('/all-user', isAuthenticated, isAdmin, allUsers);


export default router;