import { Router } from 'express';
import { login, logout, signup } from "../controllers/index.js"
import { verifyToken } from '../middlewares/index.js';

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(verifyToken, logout);

export default router;