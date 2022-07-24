const Voiture = require("../Schemas/VoitureSchema");

exports.createVoiture = async (
  model,
  entreprise,
  nom,
  dateAchat,
  kilometrage,
  annee,
  desc = "",
  type = undefined
) => {
  const newVoiture = new Voiture({
    model,
    entreprise,
    nom,
    dateAchat,
    kilometrage,
    annee,
    desc,
    type,
  });
  const result = await newVoiture.save();
  return result;
};

exports.getVoitures = async (entreprise, status = "VISIBLE") => {
  const result = await Voiture.find({ entreprise, status }).populate({
    path: "model",
    populate: {
      path: "marque",
    },
  });
  return result;
};
