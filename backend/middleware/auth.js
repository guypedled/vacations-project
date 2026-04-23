const jwt = require("jsonwebtoken");

/*
  AUTH MIDDLEWARE

  This middleware checks if the request has a valid JWT token.
  It extracts the user from the token and attaches it to req.user.
*/
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    // Extract token (Bearer <token>)
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, "secret123");

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}

/*
  ADMIN MIDDLEWARE

  This middleware checks if the logged-in user is an admin.
*/
function adminMiddleware(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).send("Access denied. Admins only.");
  }

  next();
}

module.exports = {
  authMiddleware,
  adminMiddleware,
};