const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    libelle: {
      type: String,
      uppercase: true,
      unique: true,
      required: [true, "Le model de la marque est requis."],
    },
    desc: {
      type: String,
    },
    // annee: {
    //   type: Number,
    //   required: [true, "L'année est requise."],
    // },
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
      required: true,
    },
    marque: {
      type: mongoose.Types.ObjectId,
      ref: "marque",
      required: [true, "La marque est requise."],
    },
    status: {
      type: String,
      require: true,
      enum: ["DELETE", "VISIBLE"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("model", ModelSchema);
