import express from "express";
import validate from "../middlewares/zodValidate.js";
import loginSchema from "../schema/zod/loginSchema.js";
import registerSchema from "../schema/zod/registerSchema.js";
import resetPasswordSchema from "../schema/zod/resetPassSchema.js";
import {
  login,
  register,
  logout,
  sendVerification,
  verifyEmail,
  sendResetPasswordOtp,
  resetPassword,
  isUserAuthenticated,
} from "../controllers/auth.controller.js";
import userAuth from "../middlewares/auth.middleware.js";
import { sendEmail } from "../utils/mail.js";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
const router = express.Router();

router.post("/login", validate(loginSchema), catchAsync(login));
router.post("/register", validate(registerSchema), catchAsync(register));
router.get("/logout", logout);
router.post("/send-email-otp", userAuth, catchAsync(sendVerification));
router.post("/verify-email", userAuth, catchAsync(verifyEmail));
router.post("/send-resetpassword-otp", catchAsync(sendResetPasswordOtp));
router.post(
  "/verify-resetpassword",
  validate(resetPasswordSchema),
  catchAsync(resetPassword)
);

router.get("/get-auth", catchAsync(isUserAuthenticated));

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
router.post("/users", async (req, res) => {
  const users = await User.find({});
  return res.json({ users });
});

router.post("/change", async (req, res, next) => {
  await User.findOneAndUpdate(
    { email: "act.hvfilomeno@gmail.com" },
    { isAccountVerified: false }
  );

  return res.json({ message: "Update successfull" });
});

export default router;
