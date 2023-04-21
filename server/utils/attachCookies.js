const attachCookies = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    secure: process.env.NODE_ENV === "production",
  });
};

module.exports = attachCookies;
