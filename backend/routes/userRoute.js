import express from 'express';
import { register } from '../controller/UserController.js';


const router = express.Router();

router.post('/register', register);

export default router;