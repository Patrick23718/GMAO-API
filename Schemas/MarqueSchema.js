const mongoose = require("mongoose");

const MarqueSchema = new mongoose.Schema(
  {
    libelle: {
      type: String,
      uppercase: true,
      unique: true,
      required: [true, "Le nom de la marque est requis."],
    },
    desc: {
      type: String,
    },
    status: {
      type: String,
      require: true,
      enum: ["DELETE", "VISIBLE"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("marque", MarqueSchema);
