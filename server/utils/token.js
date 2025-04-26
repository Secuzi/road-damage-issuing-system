import jwt from "jsonwebtoken";

export const generateAccessToken = (data, secret) => {
  return jwt.sign(data, secret, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (data, secret) => {
  return jwt.sign(data, secret, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token, secret) => {
  return jwt.verify(token, secret);
};

export const verifyRefreshToken = (token, secret) => {
  return jwt.verify(token, secret);
};

export const decodeAccessToken = (token) => {
  return jwt.decode(token);
};
