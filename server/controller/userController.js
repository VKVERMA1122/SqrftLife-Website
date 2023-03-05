const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const createNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.send("All field is mandatory");
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await prisma.User.create({
      data: {
        name: name,
        email: email,
        password: hashedPwd,
      },
    });
    res.json(newUser);
  } catch (error) {
    if (error.code === "P2002") {
      return res.send("Email already in use");
    }
    res.send("something went worng");
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await prisma.User.findMany();
    if (!users) return res.send("No data found");
    res.json(users);
  } catch (error) {
    res.send("something went worng");
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.send("All field is mandatory");
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) return res.send("No data found");
    res.json(user);
  } catch (error) {
    res.send("something went worng");
  }
};

const updateUser = async (req, res) => {
  const { id, name, email, invoices, qoutes } = req.body;
  try {
    const updatedUser = await prisma.User.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        invoices: invoices,
        qoutes: qoutes,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    if (error.code === "P2025") {
      return res.json(error.meta.cause);
    }
    res.send("something went worng");
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await prisma.User.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedUser);
  } catch (error) {
    if (error.code === "P2025") {
      return res.json(error.meta.cause);
    }
    res.send("something went worng");
  }
};

module.exports = {
  createNewUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
