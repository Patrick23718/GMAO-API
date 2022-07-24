const express = require("express");
const controller = require("../Controllers/voitureController");

const router = express.Router();

router.post("/", controller.create);
router.get("/:entreprise", controller.getVoiture);

module.exports = router;
