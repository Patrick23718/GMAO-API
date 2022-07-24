const express = require("express");
const controller = require("../Controllers/voitureController");
const mid = require("../Middlewares/authJWT");

const router = express.Router();

router.post("/", [mid.isAdmin], controller.create);
router.get("/employer", controller.getVoiture);
router.get("/chauffeur", [mid.isAdmin], controller.getVoiture);
router.get("/", [mid.isAdmin], controller.getVoiture);

module.exports = router;
