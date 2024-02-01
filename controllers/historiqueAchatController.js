const Voiture = require('../modeles/voiture.js');
const User  = require('../modeles/user.js');
const Achat  = require('../modeles/achat.js');


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