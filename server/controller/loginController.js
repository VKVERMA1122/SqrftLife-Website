const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password))
      return res.status(400).json({ message: "All field are mandatory" });

    const userLogin = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userLogin) return res.sendStatus(401);
    const userAuth = await compare(password, userLogin.password);
    console.log();
    if (!userAuth) {
      return res.status(400).json({ message: "Email or Password is wrong" });
    }

    if (userLogin) {
      const accessToken = jwt.sign(
        {
          userInfo: {
            userId: userLogin.id,
            name: userLogin.name,
          },
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "10m",
        }
      );
      const refreshToken = jwt.sign(
        {
          userInfo: {
            userId: userLogin.id,
            name: userLogin.name,
          },
        },
        process.env.REFRESH_SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );
      const result = await prisma.User.update({
        where: {
          id: userLogin.id,
        },
        data: {
          refreshToken: refreshToken,
        },
      });
      const responseData = {
        id: result.id,
        email: result.email,
        name: result.name,
      };
      res.cookie("userjwt", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // secure: true,
        // sameSite: "None",
      });

      return res.json({ accessToken, responseData });
    }
  } catch (error) {
    res.send("something went worng");
  }
};

const loginRefresh = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.userjwt) return res.status(401);
    const refreshToken = cookies.userjwt;
    const foundUser = await prisma.user.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
    if (!foundUser) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
      if (err || foundUser.name !== decoded.userInfo.name)
        return res.sendStatus(403);
      console.log(decoded);
      const accessToken = jwt.sign(
        {
          userId: decoded.userInfo.id,
          name: decoded.userInfo.name,
        },
        process.env.SECRET_KEY,
        { expiresIn: "10m" }
      );
      res.json({ accessToken });
    });
  } catch (error) {
    res.send("something went worng");
  }
};

const logout = (req, res) => {
  try {
    const cookies = req.cookies;
    console.log(res);
    if (!cookies?.userjwt) return res.sendStatus(204);
    res.clearCookie("userjwt", {
      httpOnly: true,
      // sameSite: "None",
      // secure: true,
    });
    res.json({ message: "Cookie cleared" });
  } catch (error) {
    res.send("something went worng");
  }
};
module.exports = {
  login,
  loginRefresh,
  logout,
};
