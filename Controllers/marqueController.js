const _marque = require("../Services/marque.service");

exports.create = async (req, res) => {
  try {
    const result = await _marque.createMarque(
      req.body.libelle,
      req.body.desc,
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

exports.getMarques = async (req, res) => {
  try {
    const result = await _marque.getMarques(req.query.status || undefined);
    if (result.length == 0)
      return res.status(404).send({ message: process.env.NOTFOUND });
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: process.env.SERVERERROR });
  }
};

exports.unShowMarqueById = async (req, res) => {
  try {
    const result = await _marque.HideShowMarqueById(
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

exports.updateMarque = async (req, res) => {
  try {
    const result = await _marque.updateMarqueById(req.params.id, {
      libelle: req.body.libelle || undefined,
      desc: req.body.desc || undefined,
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
