const Voiture = require('../modeles/voiture.js');
const User   = require('../modeles/user.js');
const jwt = require('jsonwebtoken');

// Middlewares
exports.authenticator = async (req, res, next) => {
    const token = req.body.token ? req.body.token : req.headers.authorization;
    if (token) {
        try {
            let decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded) {
              // Recherchez l'utilisateur dans la base de données
              const user = await User.findOne({ where: { email: decoded.email } });
            
              if (!user) {
                return res.status(401).json('Unauthorized: Utilisateur non trouvé');
              }
                const userData = user.dataValues || user;
              // Ajoutez les informations de l'utilisateur à req.user
              req.user = {
                email: userData.email,
                role: userData.role,
              };
              next();
            }
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

    // Vérification du rôle de l'utilisateur
    if (req.user.role !== 'admin') {
        return res.status(403).json('Forbidden: Vous n\'avez pas les droits nécessaires');
    }
    Voiture.create({
        nom : req.body.nom,
        portes : req.body.portes,
        places : req.body.places,
        prix : req.body.prix,
        carburant : req.body.carburant,
        image : req.body.image
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