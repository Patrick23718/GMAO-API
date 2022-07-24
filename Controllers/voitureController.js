const _voiture = require("../Services/voiture.service");

exports.create = async (req, res) => {
  try {
    const result = await _voiture.createVoiture(
      req.body.model,
      req.body.entreprise,
      req.body.nom,
      req.body.dateAchat,
      req.body.kilometrage,
      req.body.annee,
      req.body.desc || undefined,
      req.body.type || undefined
    );
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.getVoiture = async (req, res) => {
  try {
    const result = await _voiture.getVoitures(
      req.params.entreprise,
      req.query.status || undefined
    );
    if (result.length == 0)
      return res.status(404).send({ message: process.env.NOTFOUND });
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: process.env.SERVERERROR });
  }
};
