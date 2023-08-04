const knightService = require("../services/KnightsService");
 
exports.getAllKnights = async (req, res) => {
  try {
    const filter = req.query.filter;
    
    const knights = await knightService.getAllKnights(filter);
    res.json({ data: knights, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.createKnight = async (req, res) => {
  try {
    const knight = await knightService.createKnight(req.body);
    res.json({ data: knight, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.getKnightById = async (req, res) => {
  try {
    const knight = await knightService.getKnightById(req.params.id);
    res.json({ data: knight, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.updateKnight = async (req, res) => {
  try {
    const knight = await knightService.updateKnight(req.params.id, req.body);
    res.json({ data: knight, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deleteKnight = async (req, res) => {
  try {
    const knight = await knightService.deleteKnight(req.params.id);
    res.json({ data: knight, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};