import express from "express";
import validate from "../middlewares/zodValidate.js";
import { loginSchema, registerSchema } from "../schema/zod.schema.js";
import { login, register, logout } from "../controllers/auth.controller.js";
import userAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);
router.get("/logout", logout);
// Development routes
router.get("/protected", userAuth, (req, res) => {
  return res.json({ message: req.user });
});
export default router;
