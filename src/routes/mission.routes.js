// src/routes/missionRoutes.js

const express = require('express');
const router = express.Router();
const missionController = require('../controllers/mission.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', missionController.createMission);
router.get('/', missionController.getAllMissions);
router.put('/:id', authMiddleware, missionController.updateMission);
router.delete('/:id', authMiddleware, missionController.deleteMission);

module.exports = router;
