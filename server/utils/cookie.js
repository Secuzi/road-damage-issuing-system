export const createCookie = (res, name, token, expiry) => {
  res.cookie(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: expiry,
  });
};

export const clearCookie = (res, name) => {
  res.clearCookie(name);
};
