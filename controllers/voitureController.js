const Voiture = require('../modeles/voiture.js');

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
