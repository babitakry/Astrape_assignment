import e from "express";
import { login, signup } from "../controllers/authController.js";

const router = e.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;