import express from "express";
import validate from "../middlewares/zodValidate.js";
import { loginSchema, registerSchema } from "../schema/zod.schema.js";
import {
  login,
  register,
  logout,
  sendVerification,
  verifyEmail,
} from "../controllers/auth.controller.js";
import userAuth from "../middlewares/auth.middleware.js";
import { sendEmail } from "../utils/mail.js";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);
router.get("/logout", logout);
router.post("/send-email-otp", userAuth, sendVerification);
router.post("/verify-email", userAuth, verifyEmail);
// Development routes
router.get("/protected", userAuth, (req, res, next) => {
  return res.json({ message: req.user });
});
router.post("/smtp", async (req, res, next) => {
  const output = await sendEmail(
    "act.rtacangjr@gmail.com",
    "Subject Header",
    "Bomambini di pinili 😭, tralalelo tropa lang 😔",
    next
  );
  return res.json(output);
});

export default router;
