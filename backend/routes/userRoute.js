import express from 'express';
import { logout,login, register, reverify, verify } from '../controller/UserController.js';
import { isAuthenticated } from '../middleware/isAuthenthicated.js';


const router = express.Router();

router.post('/register', register);
router.post('/verify', verify);
router.post('/reverify', reverify);
router.post('/login', login);
router.post('/logout',isAuthenticated, logout);

export default router;