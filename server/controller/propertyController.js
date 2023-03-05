const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createProperty = async (req, res) => {
  try {
    const { name, type, location, postedById } = req.body;
    if (!name || !type || !location || !postedById) {
      return res.send("All field is mandatory");
    }
    const newProperty = await prisma.Property.create({
      data: {
        name: name,
        type: type,
        location: location,
        postedById: postedById,
      },
    });
    res.json(newProperty);
  } catch (error) {
    console.log(error);
    res.send("something went worng");
  }
};

const getAllProperty = async (req, res) => {
  try {
    const property = await prisma.Property.findMany();
    if (!property) return res.send("No data found");
    res.json(property);
  } catch (error) {
    res.send("something went worng");
  }
};

const getPropertyById = async (req, res) => {
  const id = req.params.id;
  try {
    const property = await prisma.Property.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!property) return res.send("No data found");
    res.json(property);
  } catch (error) {
    res.send("something went worng");
  }
};

const updateProperty = async (req, res) => {
  const { id, name, type, email, loaction, postedById } = req.body;
  try {
    const updatedProperty = await prisma.Property.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        type: type,
        email: email,
        loaction: loaction,
        postedById: postedById,
      },
    });
    res.json(updatedProperty);
  } catch (error) {
    if (error.code === "P2025") {
      return res.json(error.meta.cause);
    }
    res.send("something went worng");
  }
};

const deleteProperty = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProperty = await prisma.Property.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedProperty);
  } catch (error) {
    if (error.code === "P2025") {
      return res.json(error.meta.cause);
    }
    res.send("something went worng");
  }
};
// const getLeadByAgentId = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const lead = await prisma.Leads.findMany({
//       where: {
//         agentId: parseInt(id),
//       },
//     });
//     if (lead.length === 0) {
//       res.json({ msg: "No data found" });
//     }
//     res.json(lead);
//   } catch (error) {
//     res.send("something went worng");
//   }
// };

module.exports = {
  createProperty,
  getAllProperty,
  getPropertyById,
  //   getLeadByAgentId,
  updateProperty,
  deleteProperty,
};
