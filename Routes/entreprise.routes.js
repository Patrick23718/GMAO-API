const express = require("express");
const controller = require("../Controllers/entrepriseController");

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.getEntreprises);
router.get("/:id", controller.getEntreprise);
router.put("/update/:id", controller.updateEntreprise);
router.put("/:id", controller.unShowEntrepriseById);

module.exports = router;
