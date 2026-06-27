const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // Get token from request header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "Access Denied. No token provided.",
      });
    }

    // Remove "Bearer " from the token
    const actualToken = token.startsWith("Bearer ")
      ? token.slice(7)
      : token;

    // Verify JWT
    const decoded = jwt.verify(actualToken, "secretkey123");

    // Save user info in request
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = auth;