const Entreprise = require("../Schemas/EntrepriseSchema");

exports.createEntreprise = async (
  nom,
  desc,
  NRDC,
  secteur,
  status = "VISIBLE"
) => {
  const newE = new Entreprise({
    nom,
    desc,
    NRDC,
    secteur,
    status,
  });

  const result = await newE.save();
  return result;
};

exports.getEntreprises = async (status = "VISIBLE", nom = "") => {
  const result = await Entreprise.find({
    $or: [{ nom: { $regex: ".*" + nom + ".*", $options: "i" } }],
    status,
  });
  return result;
};

exports.getEntreprise = async (id) => {
  const result = await Entreprise.findById(id);
  return result;
};

exports.deleteEntreprise = async (id, status = "VISIBLE") => {
  var conditions = {
    _id: id,
    //   type: { $ne: req.userId },
  };
  var option = {};

  if (status == "VISIBLE") {
    conditions.status = "DELETE";
    option.status = "VISIBLE";
  }
  if (status == "DELETE") {
    conditions.status = "VISIBLE";
    option.status = "DELETE";
  }

  const update = {
    $set: option,
  };

  const result = await Entreprise.updateOne(conditions, update);
  return result;
};

exports.updateEntreprise = async (id, entreprise) => {
  var entrepriseUpdate = {};

  if (entreprise.nom) entrepriseUpdate.nom = entreprise.nom;
  if (entreprise.desc) entrepriseUpdate.desc = entreprise.desc;
  if (entreprise.NRDC) entrepriseUpdate.NRDC = entreprise.NRDC;
  if (entreprise.secteur) entrepriseUpdate.secteur = entreprise.secteur;

  var conditions = {
    _id: id,
    //   type: { $ne: req.userId },
  };

  var update = {
    $set: entrepriseUpdate,
  };

  const result = await Entreprise.updateOne(conditions, update);
  return result;
};
