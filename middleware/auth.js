const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from the request header

  const token = req.header("x-auth-token");

  // Check if token available
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verification

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user; //

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
