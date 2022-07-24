const Marque = require("../Schemas/MarqueSchema");

exports.createMarque = async (libelle, desc = "", status = "VISIBLE") => {
  const newM = new Marque({
    libelle: libelle,
    desc: desc,
    status: status,
  });
  const result = await newM.save();
  return result;
};

exports.getMarques = async (status = "VISIBLE") => {
  const result = await Marque.find({ status: status });
  return result;
};

exports.getMarqueById = async (id, status = "VISIBLE") => {
  const result = await Marque.find({ _id: id, status: status });
  return result;
};

exports.getMarqueByName = async (name, status = "VISIBLE") => {
  const result = await Marque.find({ libelle: name, status: status });
  return result;
};

exports.HideShowMarqueById = async (id, status = "VISIBLE") => {
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

  const result = await Marque.updateOne(conditions, update);
  return result;
};

exports.updateMarqueById = async (id, marque) => {
  var marqueUpdate = {};

  if (marque.libelle) marqueUpdate.libelle = marque.libelle;
  if (marque.desc) marqueUpdate.desc = marque.desc;

  var conditions = {
    _id: id,
    //   type: { $ne: req.userId },
  };

  var update = {
    $set: marqueUpdate,
  };

  const result = await Marque.updateOne(conditions, update);
  return result;
};
