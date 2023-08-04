const express = require("express");
const {
  getAllKnights,
  createKnight,
  getKnightById,
  updateKnight,
  deleteKnight,
} = require("../controllers/KnightsController");
 
const router = express.Router();
 
router.route("/").get(getAllKnights).post(createKnight);
router.route("/:id").get(getKnightById).put(updateKnight).delete(deleteKnight);
 
module.exports = router;