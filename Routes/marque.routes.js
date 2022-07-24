const express = require("express");
const controller = require("../Controllers/marqueController");

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.getMarques);
router.put("/update/:id", controller.updateMarque);
router.put("/:id", controller.unShowMarqueById);

module.exports = router;
