// routes/comptaRoute.js
const express = require('express');
const Router = express.Router();
const Compta = require('../controllers/historiqueAchatController.js');

// Ajouter une route pour le compte rendu du gain total par mois
Router.get('/historique', Compta.getAllAchats);
Router.get('/compta', Compta.compteRendu);
Router.post('/acheter' ,Compta.authenticator, Compta.createAchat);

module.exports = Router;