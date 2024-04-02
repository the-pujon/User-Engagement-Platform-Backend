const express = require("express");
const router = express.Router();
const controller = require("../controllers/submitMission.controllers");

router.get("/", controller.getAllSubmittedMission);
router.post("/", controller.createSubmittedMission);
router.get("/:id", controller.getSubmittedMissionById);
router.patch("/:id", controller.updateSubmittedMissionById);
router.delete("/:id", controller.deleteSubmittedMissionById);

module.exports = router;
