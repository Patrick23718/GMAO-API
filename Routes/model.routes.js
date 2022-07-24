const express = require("express");
const controller = require("../Controllers/modelController");

const router = express.Router();

router.post("/", controller.create);
router.get("/:marque", controller.getModels);
// router.put("/update/:id", controller.updateMarque);
// router.put("/:id", controller.unShowMarqueById);

module.exports = router;
