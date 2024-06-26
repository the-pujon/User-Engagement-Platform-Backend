const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema(
  {
    missionType: {
      type: String,
      enum: ["survey", "interview"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions:[]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mission", missionSchema);
