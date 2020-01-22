const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

const withAuth = function(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

  if (!token) {
    // console.log("Middleware: Le token n'existe pas")
    res.status(401).send('Unauthorized: No token provided');
  } else {

    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        // console.log("Token vérifié")
        req.pseudo = decoded.pseudo;
        next();
      }
    });
  }
}

module.exports = withAuth;
