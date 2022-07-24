const express = require("express");
const controller = require("../Controllers/personneController");

const router = express.Router();

router.post("/register/employe", controller.signupemploye);
router.post("/register/chauffeur", controller.signupchauffeur);
router.post("/signin", controller.signin);
// router.get("/", controller.getEntreprises);
// router.get("/:id", controller.getEntreprise);
// router.put("/update/:id", controller.updateEntreprise);
// router.put("/:id", controller.unShowEntrepriseById);

module.exports = router;
