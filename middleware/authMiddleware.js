const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Get token from header
  const token = req.header('Authorization');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

    // Set user in request
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = authMiddleware;