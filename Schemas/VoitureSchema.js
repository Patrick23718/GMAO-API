const mongoose = require("mongoose");

const VoitureSchema = new mongoose.Schema(
  {
    model: {
      type: mongoose.Types.ObjectId,
      ref: "model",
      required: [true, "La marque est requise."],
    },
    entreprise: {
      type: mongoose.Types.ObjectId,
      ref: "entreprise",
      required: [true, "La marque est requise."],
    },
    nom: {
      type: String,
      required: true,
    },
    dateAchat: {
      type: Date,
      required: true,
    },
    kilometrage: {
      type: Number,
      required: true,
    },
    annee: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
    },
    type: {
      type: String,
      enum: [
        "SUV",
        "Berline",
        "Pick-Up",
        "Decapo",
        "Remorque",
        "Semi Remorque",
      ],
    },
    status: {
      type: String,
      require: true,
      enum: ["DELETE", "VISIBLE"],
      default: "VISIBLE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("voiture", VoitureSchema);
