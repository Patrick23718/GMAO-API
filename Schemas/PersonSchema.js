const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    entreprise: {
      type: mongoose.Types.ObjectId,
      ref: "entreprise",
      required: true,
    },
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
    },
    poste: {
      type: String,
      required: true,
    },
    dateNais: {
      type: Date,
      required: true,
    },
    identite: {
      type: String,
      required: true,
    },
    delivrance: {
      type: Date,
      required: true,
    },
    expiration: {
      type: Date,
      required: true,
    },
    personne: {
      type: String,
      enum: {
        values: ["Chauffeur", "Employe"],
        message: "{VALUE} n'est pas prise en compte",
      },
      required: true,
      default: "Employe",
    },
    categorie: {
      type: String,
      required: function () {
        return this.personne == "Chauffeur";
      },
    },
    deli: {
      type: Date,
      required: function () {
        return this.personne == "Chauffeur";
      },
    },
    exp: {
      type: Date,
      validate: {
        validator: function (v) {
          return v > this.deli;
        },
        message: (props) =>
          `${props.value} doit etre apres la date de délivrance`,
      },
      required: [
        function () {
          return this.personne == "Chauffeur";
        },
        "La date déxpiration doit etre val",
      ],
    },
    numero: {
      type: String,
      required: true,
    },
    ville: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "pdg", "root"],
      default: "user",
      required: true,
    },
    status: {
      type: String,
      require: true,
      enum: ["DELETE", "VISIBLE"],
      default: "VISIBLE",
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("personne", personSchema);
