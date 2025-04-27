import { createCookie } from "../utils/cookie.js";
import { minutesToMilliseconds } from "../utils/expiry.js";
import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/token.js";
import createError from "http-errors";
const userAuth = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (accessToken) {
    const { id, role } = verifyAccessToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    req.user = { id, role };
    return next();
  }

  if (!accessToken && !refreshToken) {
    return next(createError(400, "Log in again"));
  }

  const { id, email, role } = verifyRefreshToken(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const payload = { id, email, role };
  const newAccessToken = generateAccessToken(
    payload,
    process.env.ACCESS_TOKEN_SECRET
  );
  createCookie(res, "accessToken", newAccessToken, minutesToMilliseconds(15));
  req.user = { id, role };
  return next();
};

export default userAuth;
