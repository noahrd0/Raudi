const Voiture = require('../modeles/voiture.js');
const User  = require('../modeles/user.js');
const Achat  = require('../modeles/achat.js');
const sequelize = require('sequelize');
require("dotenv").config();
const jwt = require('jsonwebtoken');

// Middlewares
exports.authenticator = async (req, res, next) => {
    const token = req.body.token ? req.body.token : req.headers.authorization;
    console.log(token);
    if (token) {
        try {
            let decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded) {

              // Recherchez l'utilisateur dans la base de données
              const user = await User.findOne({ where: { email: decoded.email } });
              console.log(user.id);
            
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

exports.compteRendu = async (req, res) => {
    try {
        const result = await Achat.findAll({
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('dateAchat')), 'month'],
                [sequelize.fn('SUM', sequelize.col('montant')), 'totalGains']
            ],
            group: [sequelize.fn('MONTH', sequelize.col('dateAchat'))],
            raw: true
        });

        res.json(result);
    } catch (error) {
        console.error('Erreur lors de la récupération du compte rendu des gains:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.createAchat = async (req, res) => {
    try {
        // Récupérer les détails nécessaires pour créer un achat depuis le corps de la requête
        const { clientId, voitureId, montant, dateAchat } = req.body;

        // Vérifier si les détails nécessaires sont présents
        if (!clientId || !voitureId || !montant || !dateAchat) {
            return res.status(400).json({ message: "Veuillez fournir toutes les informations nécessaires." });
        }

        // Créer un nouvel achat
        const newAchat = await Achat.create({
            clientId,
            voitureId,
            montant,
            dateAchat,
        });

        // Répondre avec les détails de l'achat créé
        return res.status(201).json(newAchat);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur lors de la création de l'achat." });
    }
};

// Ajoutez une fonction pour récupérer tout l'historique d'achat
exports.getAllAchats = (req, res) => {
    Achat.findAll({
        include: [User, Voiture],
    })
        .then(achats => {
            res.send(achats);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération de l'historique d'achat."
            });
        });
};