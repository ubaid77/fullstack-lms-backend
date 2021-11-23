const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(401).json({
      success: false,
      error: "Forbidden",
    });
  }

  const bearer = bearerHeader.split(" ");
  const token = bearer[1];

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) {
    return res.status(401).json({
      success: false,
      error: "Authorization failed",
    });
  }
  req.user = verified.id;
  next();
}

module.exports = verifyToken;
