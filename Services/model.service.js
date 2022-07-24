const Model = require("../Schemas/ModelSchema");

exports.createModel = async (
  libelle,
  desc = "",
  marque,
  type,
  status = "VISIBLE"
) => {
  const newM = new Model({
    libelle,
    desc,
    marque,
    type,
    status,
  });
  const result = await newM.save();
  return result;
};

exports.getModelsByMarque = async (status = "VISIBLE") => {
  const result = await Model.find({ status: status }).populate({
    path: "marque",
    select: ["libelle", "desc", "status"],
  });
  return result;
};

exports.getModels = async (marque, status = "VISIBLE") => {
  const result = await Model.find({ marque, status }).populate({
    path: "marque",
    select: ["libelle", "desc", "status"],
  });
  return result;
};

exports.getModelById = async (id, status = "VISIBLE") => {
  const result = await Model.find({ _id: id, status: status });
  return result;
};

exports.getModelByName = async (name, status = "VISIBLE") => {
  const result = await Model.find({ libelle: name, status: status });
  return result;
};

exports.HideShowModelById = async (id, status = "VISIBLE") => {
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

  const result = await Model.updateOne(conditions, update);
  return result;
};

exports.updateModelById = async (id, model) => {
  var modelUpdate = {};

  if (model.libelle) modelUpdate.libelle = model.libelle;
  if (model.desc) modelUpdate.desc = model.desc;

  var conditions = {
    _id: id,
    //   type: { $ne: req.userId },
  };

  var update = {
    $set: modelUpdate,
  };

  const result = await Model.updateOne(conditions, update);
  return result;
};
