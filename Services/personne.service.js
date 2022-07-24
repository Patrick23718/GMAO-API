const Personne = require("../Schemas/PersonSchema");

exports.getPersonneUpToDate = async (
  entreprise,
  type = "Employe",
  status = "VISIBLE"
) => {
  var option = { personne: null };

  if (type == "Employe")
    option = {
      entreprise,
      personne: type,
      status,
      expiration: { $gt: Date.now() },
    };
  if (type == "Chauffeur")
    option = {
      entreprise,
      personne: type,
      status,
      exp: { $gt: Date.now() },
      expiration: { $gt: Date.now() },
    };
  const person = await Personne.find(option)
    .populate("entreprise")
    .select(
      "entreprise nom prenom poste dateNais identite delivrance expiration personne categorie deli exp numero ville username "
    );

  return person;
};

exports.getPersonne = async (id) => {
  const person = await Personne.findOne({ _id: id })
    .populate("entreprise")
    .select(
      "entreprise nom prenom poste dateNais identite delivrance expiration personne categorie deli exp numero ville username "
    );

  return person;
};
exports.getPersonnes = async (entreprise) => {
  const personne = await Personne.find({ entreprise })
    .populate("entreprise")
    .select(
      "entreprise nom prenom poste dateNais identite delivrance expiration personne categorie deli exp numero ville username "
    );

  return person;
};

exports.updatePersonne = async (id, entreprise, person) => {
  var personneUpdate = {};
  // if(person.entreprise) entreprise = person.entreprise,
  if (person.nom) personneUpdate.nom = person.nom;
  if (person.prenom) personneUpdate.prenom = person.prenom;
  if (person.poste) personneUpdate.poste = person.poste;
  if (person.dateNais) personneUpdate.dateNais = person.dateNais;
  if (person.identite) personneUpdate.identite = person.identite;
  if (person.delivrance) personneUpdate.delivrance = person.delivrance;
  if (person.expiration) personneUpdate.expiration = person.expiration;
  if (person.personne) personneUpdate.personne = person.personne;
  if (person.ville) personneUpdate.ville = person.ville;
  if (person.status) personneUpdate.status = person.status;
  if (person.numero) personneUpdate.numero = person.numero;
  const persons = await Personne.updateOne(
    { _id: id, entreprise },
    { $set: personneUpdate }
  );

  return persons;
};
