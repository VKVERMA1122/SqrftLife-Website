const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createLead = async (req, res) => {
  try {
    const { name, phone_no, email, agentId } = req.body;
    if (!name || !phone_no || !email || !agentId) {
      return res.send("All field is mandatory");
    }
    const newUser = await prisma.Leads.create({
      data: {
        name: name,
        email: email,
        phone_no: phone_no,
        agentId: agentId,
      },
    });
    res.json(newUser);
  } catch (error) {
    res.send("something went worng");
  }
};

const getAllLeads = async (req, res) => {
  try {
    const leads = await prisma.Leads.findMany();
    if (!leads) return res.send("No data found");
    res.json(leads);
  } catch (error) {
    res.send("something went worng");
  }
};

const getLeadById = async (req, res) => {
  const id = req.params.id;
  try {
    const lead = await prisma.Leads.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!lead) return res.send("No data found");
    res.json(lead);
  } catch (error) {
    res.send("something went worng");
  }
};

const updateLead = async (req, res) => {
  const { id, name, phone_no, email, agentId } = req.body;
  try {
    const updatedLead = await prisma.Leads.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        phone_no: phone_no,
        agentId: agentId,
      },
    });
    res.json(updatedLead);
  } catch (error) {
    if (error.code === "P2025") {
      return res.json(error.meta.cause);
    }
    res.send("something went worng");
  }
};

const deleteLead = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedLead = await prisma.Leads.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedLead);
  } catch (error) {
    if (error.code === "P2025") {
      return res.json(error.meta.cause);
    }
    res.send("something went worng");
  }
};
const getLeadByAgentId = async (req, res) => {
  const id = req.params.id;
  try {
    const lead = await prisma.Leads.findMany({
      where: {
        agentId: parseInt(id),
      },
    });
    if (lead.length === 0) {
      res.json({ msg: "No data found" });
    }
    res.json(lead);
  } catch (error) {
    res.send("something went worng");
  }
};

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  getLeadByAgentId,
  updateLead,
  deleteLead,
};
