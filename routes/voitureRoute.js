const express = require('express');
const Router = express.Router();
const Voiture = require('../controllers/voitureController.js');

Router.get('/',Voiture.authenticator, Voiture.getAllVoiture);
Router.get('/:id', Voiture.getVoitureById);
Router.post('/',Voiture.authenticator, Voiture.createVoiture);

module.exports = Router;