const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).send({
      message: 'Akses ditolak',
    });
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: 'Akses ditolak',
        });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
