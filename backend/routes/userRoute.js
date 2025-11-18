import express from 'express';
import { login, register, reverify, verify } from '../controller/UserController.js';


const router = express.Router();

router.post('/register', register);
router.post('/verify', verify);
router.post('/reverify', reverify);
router.post('/login', login);
//router.post('/logout', logout);

export default router;