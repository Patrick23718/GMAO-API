const _model = require("../Services/model.service");

exports.create = async (req, res) => {
  try {
    const result = await _model.createModel(
      req.body.libelle,
      req.body.desc,
      req.body.marque,
      req.body.type,
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

exports.getModels = async (req, res) => {
  try {
    const result = await _model.getModels(
      req.params.marque,
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
