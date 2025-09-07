import e from "express";
import { signup } from "../controllers/authController.js";

const router = e.Router();

router.post("/register", signup);

export default router;