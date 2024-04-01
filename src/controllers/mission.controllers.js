const Mission = require("../model/mission.schema");

exports.createMission = async (req, res) => {
  try {
    const { title, description, missionType } = req.body;
    const createdBy = req.user.userId;
    const newMission = await Mission.create({
      missionType,
      title,
      description,
      createdBy,
    });
    res.status(201).json(newMission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMissions = async (req, res) => {
  try {
    const missions = await Mission.find();
    res.status(200).json(missions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMission = async (req, res) => {
  try {
    const { title, description, status, missionType } = req.body;
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ error: "Mission not found" });
    }
    if (mission.createdBy != req.user.userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this mission" });
    }
    mission.missionType = missionType;
    mission.title = title;
    mission.description = description;
    mission.status = status;
    await mission.save();
    res.status(200).json(mission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMission = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ error: "Mission not found" });
    }
    if (mission.createdBy != req.user.userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this mission" });
    }
    await mission.remove();
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
