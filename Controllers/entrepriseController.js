const _entreprise = require("../Services/entreprise.service");

exports.create = async (req, res) => {
  try {
    const result = await _entreprise.createEntreprise(
      req.body.nom,
      req.body.desc,
      req.body.NRDC,
      req.body.secteur,
      req.body.status || undefined
    );
    return res.status(201).send(result);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: process.env.SERVERERROR, error: error });
  }
};

exports.getEntreprises = async (req, res) => {
  try {
    const result = await _entreprise.getEntreprises(
      req.query.status || undefined,
      req.query.nom || undefined
    );
    if (result.length == 0)
      return res.status(404).send({ message: process.env.NOTFOUND });
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: process.env.SERVERERROR });
  }
};

exports.getEntreprise = async (req, res) => {
  try {
    const result = await _entreprise.getEntreprise(req.params.id);
    if (!result) return res.status(404).send({ message: process.env.NOTFOUND });
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: process.env.SERVERERROR });
  }
};

exports.unShowEntrepriseById = async (req, res) => {
  try {
    const result = await _entreprise.deleteEntreprise(
      req.params.id,
      req.query.status || undefined
    );
    // if (result.length == 0)
    //   return res.status(404).send({ message: process.env.NOTFOUND });
    if (result.modifiedCount == 0) return res.status(404).send(result);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: process.env.SERVERERROR });
  }
};

exports.updateEntreprise = async (req, res) => {
  try {
    const result = await _entreprise.updateEntreprise(req.params.id, {
      nom: req.body.nom || undefined,
      desc: req.body.desc || undefined,
      NDRC: req.body.NRDC || undefined,
      secteur: req.body.secteur || undefined,
    });
    // if (result.length == 0)
    //   return res.status(404).send({ message: process.env.NOTFOUND });
    if (result.modifiedCount == 0) return res.status(404).send(result);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: process.env.SERVERERROR });
  }
};
