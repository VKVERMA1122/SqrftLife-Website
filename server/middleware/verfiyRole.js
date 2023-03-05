const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verfiyRole = ({ route, pos }) => {
  return async (req, res, next) => {
    let userId;
    try {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token
        userId = decoded.userInfo.userId;
      });
      const loginUser = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (loginUser[route][pos] === 1) {
        next();
      } else {
        res.sendStatus(401);
      }
      //console.log(req);
    } catch (error) {
      res.sendStatus(401);
    }
  };
};

module.exports = verfiyRole;
