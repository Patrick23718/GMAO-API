const mongoose = require("mongoose");

const EntrepriseSchema = new mongoose.Schema(
  {
    nom: {
      type: String,

      required: [true, "La nom est requis."],
    },
    desc: {
      type: String,
    },
    NRDC: {
      type: String,
      unique: true,
      required: [true, "Le NRDC est requis."],
    },
    secteur: {
      type: String,
      required: [true, "Le secteur d'activité est requis."],
    },
    status: {
      type: String,
      enum: ["VISIBLE", "DELETE"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("entreprise", EntrepriseSchema);
