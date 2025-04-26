import createError from "http-errors";
import { createCookie } from "../utils/cookie.js";
import { minutesToMilliseconds, daysToMilliseconds } from "../utils/expiry.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { hashPassword, isPasswordMatch } from "../utils/hash.js";
import User from "../models/user.model.js";

export const login = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log(error);
    next(error);
  }
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

  try {
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
  } catch (error) {
    console.log(error);
    next(error);
  }
};
