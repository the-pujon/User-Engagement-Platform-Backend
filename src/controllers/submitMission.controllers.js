const Mission = require("../model/submitMission.schema");

// Controller function to create a new mission
exports.createSubmittedMission = async (req, res) => {
  try {
    const newMission = await Mission.create(req.body);
    res.status(201).json({
      status: "success",
      data: newMission,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Controller function to get all missions
exports.getAllSubmittedMission = async (req, res) => {
  try {
    const missions = await Mission.find();
    res.status(200).json({
      status: "success",
      data: missions,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Controller function to get a single mission by ID
exports.getSubmittedMissionById = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      throw new Error("Mission not found");
    }
    res.status(200).json({
      status: "success",
      data: mission,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Controller function to update a mission by ID
exports.updateSubmittedMissionById = async (req, res) => {
  try {
    const mission = await Mission.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!mission) {
      throw new Error("Mission not found");
    }
    res.status(200).json({
      status: "success",
      data: mission,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Controller function to delete a mission by ID
exports.deleteSubmittedMissionById = async (req, res) => {
  try {
    const mission = await Mission.findByIdAndDelete(req.params.id);
    if (!mission) {
      throw new Error("Mission not found");
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
