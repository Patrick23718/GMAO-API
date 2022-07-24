const User = require("../Schemas/PersonSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _personne = require("../Services/personne.service");

exports.changePassword = async (req, res) => {
  try {
    var id = req.userId;
    const user = User.findById(id);

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(400).send({
        message: "Ancien mot de passe incorrect.",
      });
    }
    let userData = {};
    userData.password = bcrypt.hashSync(req.body.newpassword, 8);
    const resultat = await User.updateOne({ _id: id }, { $set: userData });
    if (!resultat)
      return res.status(404).json({
        message: "Oups!! aucune information pour l'identifiant fourni",
      });
    res.status(200).json({
      message: "Mise à jour reussie",
      doc: resultat,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: process.env.SERVERERROR, error });
  }
};

exports.signupemploye = async (req, res) => {
  try {
    const user = new User({
      entreprise: req.body.entreprise,
      nom: req.body.nom,
      prenom: req.body.prenom,
      poste: req.body.poste,
      dateNais: req.body.dateNais,
      identite: req.body.identite,
      delivrance: req.body.delivrance,
      expiration: req.body.expiration,
      username: req.body.username,
      ville: req.body.ville,
      role: req.body.role,
      numero: req.body.numero,
      password: bcrypt.hashSync(process.env.PASSWORD, 8),
    });

    const reg = await user.save();
    return res.status(201).send({ message: "ok", reg });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: process.env.SERVERERROR, error });
  }
};

exports.signupchauffeur = async (req, res) => {
  try {
    const user = new User({
      entreprise: req.body.entreprise,
      nom: req.body.nom,
      prenom: req.body.prenom,
      poste: req.body.poste,
      dateNais: req.body.dateNais,
      identite: req.body.identite,
      delivrance: req.body.delivrance,
      expiration: req.body.expiration,
      username: req.body.username,
      ville: req.body.ville,
      categorie: req.body.categorie,
      deli: req.body.deli,
      exp: req.body.exp,
      role: req.body.role,
      numero: req.body.numero,
      password: bcrypt.hashSync(rprocess.env.PASSWORD, 8),
    });

    const reg = await user.save();
    return res.status(201).send({ message: "ok", reg });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: process.env.SERVERERROR });
  }
};

exports.signin = async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  }).populate("entreprise");
  // .populate("role", "-__v")

  if (!user) {
    return res
      .status(404)
      .send({ message: "Nom d'utilisateur ou mot de passe incorrect." });
  }
  var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordIsValid) {
    return res.status(400).send({
      accessToken: null,
      message: "Nom d'utilisateur ou mot de passe incorrect.",
    });
  }
  var token = jwt.sign(
    { id: user._id, role: user.role, entreprise: user.entreprise._id },
    process.env.SECRET,
    {
      expiresIn: 86400, // 24 hours
    }
  );

  res.status(200).send({
    id: user._id,
    nom: user.nom,
    prenom: user.prenom,
    username: user.username,
    role: user.role,
    imageURL: user.imageURL,
    accessToken: token,
    entreprise: user.entreprise,
  });
};

exports.getPersonnes = async (req, res) => {
  try {
    const result = await _personne.getPersonnes(req.params.id);
    if (result.length == 0)
      return res.status(404).send({ message: process.env.NOTFOUND });
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: process.env.SERVERERROR });
  }
};

exports.getPersonneUpToDate = async (req, res) => {
  try {
    const result = await _personne.getPersonneUpToDate(
      req.params.id,
      req.query.type || undefined,
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

exports.getPersonne = async (req, res) => {
  try {
    const result = await _personne.getPersonne(req.userId);
    if (!result) return res.status(404).send({ message: process.env.NOTFOUND });
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: process.env.SERVERERROR });
  }
};

exports.updatePersonne = async (req, res) => {
  try {
    const result = await _personne.updatePersonne(
      req.userId,
      req.entreprise,
      req.body
    );
    if (result.modifiedCount == 0) return res.status(404).send(result);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: process.env.SERVERERROR });
  }
};
