const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
  mission: {
    type: mongoose.Types.ObjectId,
    ref: "mission",
    required: true,
  },
  person: {
    type: mongoose.Types.ObjectId,
    ref: "personne",
    required: true,
  },
  isChief: {
    type: Boolean,
    unique: true,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("participant", ParticipantSchema);
