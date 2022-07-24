const express = require("express");
const controller = require("../Controllers/personneController");
const mid = require("../Middlewares/authJWT");
const router = express.Router();

router.post(
  "/register/employe",
  [mid.verifyToken, mid.isAdmin],
  controller.signupemploye
);
router.post(
  "/register/chauffeur",
  [mid.verifyToken, mid.isAdmin],
  controller.signupchauffeur
);
router.post("/signin", controller.signin);
router.put("/resetpassword", controller.changePassword);
router.get("/profile", [mid.verifyToken], controller.getPersonne);
router.put("/profile/update", [mid.verifyToken], controller.updatePersonne);
// router.put("/update/:id", controller.updateEntreprise);
// router.put("/:id", controller.unShowEntrepriseById);

module.exports = router;
