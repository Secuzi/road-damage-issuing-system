import createError from "http-errors";
import { clearCookie, createCookie } from "../utils/cookie.js";
import { minutesToMilliseconds, daysToMilliseconds } from "../utils/expiry.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { hashPassword, isPasswordMatch } from "../utils/hash.js";
import User from "../models/user.model.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendEmail } from "../utils/mail.js";

export const login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(createError(404, "User not found"));

  const isPasswordMatched = await isPasswordMatch(
    req.body.password,
    user.password
  );
  if (!isPasswordMatched) return next(createError(400, "Invalid password"));

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(
    payload,
    process.env.ACCESS_TOKEN_SECRET
  );
  const refreshToken = generateRefreshToken(
    payload,
    process.env.REFRESH_TOKEN_SECRET
  );

  createCookie(res, "accessToken", accessToken, minutesToMilliseconds(15));
  createCookie(res, "refreshToken", refreshToken, daysToMilliseconds(7));

  res.status(200).json({
    message: "Login successful",
  });
};

export const register = async (req, res, next) => {
  const mockData = {
    verificationOtp: Math.floor(100000 + Math.random() * 900000),
    verificationOtpExpireAt: Date.now() + 5 * 60 * 1000,
    resetPasswordOtp: Math.floor(100000 + Math.random() * 900000),
    resetPasswordOtpExpireAt: Date.now() + 5 * 60 * 1000,
    avatar:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
  };

  const isUserExist = await User.findOne({ email: req.body.email });
  if (isUserExist) return next(createError(400, "User already exists"));

  const userData = {
    ...req.body,
  };
  const hashedPassword = await hashPassword(userData.password);
  userData.password = hashedPassword;
  await User.create(userData);

  const user = await User.findOne(
    { email: userData.email },
    { email: true, role: true }
  );

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(
    payload,
    process.env.ACCESS_TOKEN_SECRET
  );
  const refreshToken = generateRefreshToken(
    payload,
    process.env.REFRESH_TOKEN_SECRET
  );
  createCookie(res, "accessToken", accessToken, minutesToMilliseconds(15));
  createCookie(res, "refreshToken", refreshToken, daysToMilliseconds(7));

  res.status(201).json({ message: "User created successfully" });
};

export const logout = async (req, res) => {
  clearCookie(res, "accessToken");
  clearCookie(res, "refreshToken");

  return res.status(200).json({ message: "Logged out" });
};

export const sendVerification = async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);
  if (!user) {
    return next(createError(404, "User could not be found"));
  }

  if (user.isAccountVerified) {
    return next(createError(404, "Account has already been verified"));
  }

  const otp = generateOtp();

  user.verificationOtp = otp;

  user.verificationOtpExpireAt = Date.now() + minutesToMilliseconds(1);
  await user.save();

  const output = await sendEmail(
    user.email,
    "Email Verification",
    `Thank you for verifying your account. Your one-time password (OTP) is: ${otp}`,
    next
  );
  return res.status(200).json(output);
};

export const verifyEmail = async (req, res, next) => {
  const { otp } = req.body;
  const { id } = req.user;
  if (!otp) {
    return next(createError(400, "OTP must be supplied."));
  }

  const user = await User.findById(id);
  if (!user) {
    return next(createError(404, "User could not be found"));
  }

  if (user.verificationOtp !== otp || user.verificationOtp === "") {
    return next(createError(404, "Invalid OTP"));
  }

  if (user.verificationOtpExpireAt < Date.now()) {
    return next(createError(404, "OTP has expired"));
  }

  user.isAccountVerified = true;
  user.verificationOtp = "";
  user.verificationOtpExpireAt = 0;
  await user.save();

  return res.status(200).json({ message: "Account verified" });
};
