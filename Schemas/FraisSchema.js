const mongoose = require("mongoose");

const FraisSchema = new mongoose.Schema({
  libelle: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  montant: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("frais", FraisSchema);
