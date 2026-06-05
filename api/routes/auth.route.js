import express from 'express';
import { singup, signin } from '../controllers/auth.controller.js'


const router = express.Router();

router.post('/signup', singup)
router.post('/signin', signin)
router.post('/google', authGoogle )

export default router;