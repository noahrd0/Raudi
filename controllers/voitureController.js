const Voiture = require('../modeles/voiture.js');
const User = require('../modeles/user.js');
const jwt = require('jsonwebtoken');

// Middlewares
exports.authenticator = async (req, res, next) => {
    const token = req.body.token ? req.body.token : req.headers.authorization;
    console.log(token);
    if (token) {
      try {
          next();
      } catch (error) {
        return res.status(401).json('Unauthorized: Token invalide');
      }
    } else {
      return res.status(401).json('Unauthorized: Token non fourni');
    }
  };

exports.getAllVoiture = (req, res) => {
    Voiture.findAll()
        .then(voiture => {
            res.send(voiture);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving voiture."
            });
        });
};

exports.getVoitureById = (req, res) => {
    Voiture.findByPk(req.params.id)
        .then(voiture => {
            res.send(voiture);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving voiture."
            });
        });
};

exports.createVoiture = (req, res) => {
    Voiture.create({
        nom : req.body.nom,
        portes : req.body.portes,
        places : req.body.places,
        prix : req.body.prix,
        carburant : req.body.carburant
    })
        .then(voiture => {
            res.send(voiture);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving voiture."
            });
        });
};
