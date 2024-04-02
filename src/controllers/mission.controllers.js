const Mission = require("../model/mission.schema");

exports.createMission = async (req, res) => {
  try {
    const { title, description, missionType, userId, questions } = req.body;
    //const createdBy = req.user.userId;
    const newMission = await Mission.create({
      missionType,
      title,
      description,
      createdBy:userId,
      questions
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

exports.getSingleMissions = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    res.status(200).json(mission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMission = async (req, res) => {
  try {
    const { title, description, status, missionType, questions } = req.body;
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ error: "Mission not found" });
    }
    if (mission.createdBy != req.decoded.userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this mission" });
    }
    mission.missionType = missionType;
    mission.title = title;
    mission.description = description;
    mission.status = status;
    mission.questions = questions
    await mission.save();
    res.status(200).json(mission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMission = async (req, res) => {
  //console.log(req)
  try {
    const mission = await Mission.findById(req.params.id);
    console.log(mission)
    if (!mission) {
      return res.status(404).json({ error: "Mission not found" });
    }
    if (mission.createdBy != req.decoded.userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this mission" });
    }
   const missionDelete = await Mission.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", message: "Mission deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
