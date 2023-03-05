const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  // console.log(authHeader); // Bearer token
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    // console.log(err);
    if (err) return res.sendStatus(403); //invalid token
    // req.user = decoded.username;
    // console.log(decoded);
    next();
  });
};

module.exports = verifyJWT;
