const jwt = require("jsonwebtoken");

const User = require("../Schemas/PersonSchema");

verifyToken = (req, res, next) => {
  req.userId = undefined;
  req.role = undefined;
  req.entreprise = undefined;

  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "Vous devez vous connecter" });
  }

  try {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Vous devez vous connecter!" });
      }
      req.userId = decoded.id;
      req.role = decoded.role;
      req.entreprise = decoded.entreprise;
      console.log({ id: req.userId, role: req.role, entre: req.entreprise });
      next();
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

isAdmin = (req, res, next) => {
  req.role === "admin"
    ? next()
    : res.status(403).send({ message: "Require admin Role!" });
};

isRoot = (req, res, next) => {
  req.role === "root"
    ? next()
    : res.status(403).send({ message: "Require admin Role!" });
};

isPDG = () => {
  req.role === "pdg"
    ? next()
    : res.status(403).send({ message: "Require pdg Role!" });
};

isUser = (req, res, next) => {
  req.role === "user"
    ? next()
    : res.status(403).send({ message: "Require user Role!" });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isRoot,
  isPDG,
  isUser,
};
module.exports = authJwt;
