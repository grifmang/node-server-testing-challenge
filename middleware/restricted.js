const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../api/config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: "Token is not valid." })
      } else {
        req.username = decodedToken.username;
        return next();
      }
    })
  } else {
    return res.status(401).json({ error: "You need a user token to access this resource. Please login first." });
  }
};
