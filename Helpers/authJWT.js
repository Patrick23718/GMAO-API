const jwt = require("jsonwebtoken");

const User = require("../Schemas/PersonSchema");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "Vous devez vous connecter" });
  }

  try {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Vous devez vous connecter!" });
      }
      console.log(decoded);
      //req.userId = decoded.id;
      //req.role = decoded.role;
      next();
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user === null || user === {}) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }

    if (user.role === "admin") {
      next();
      return;
    }

    res.status(403).send({ message: "Require Admin Role!" });
    return;
  });
};

isRoot = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user === null || user === {}) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }

    if (user.role === "root") {
      next();
      return;
    }

    res.status(403).send({ message: "Require Coiffeuse Role!" });
    return;
  });
};

isCliente = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user === null || user === {}) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }

    if (user.role === "cliente") {
      next();
      return;
    }

    res.status(403).send({ message: "Require Cliente Role!" });
    return;
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isCoiffeuse,
  isCliente,
};
module.exports = authJwt;
