const express = require('express');
const Router = express.Router();
const Voiture = require('../controllers/voitureController.js');
 
Router.get('/',Voiture.getAllVoiture);
Router.get('/getVoiture/:id', Voiture.getVoitureById);
Router.post('/',Voiture.authenticator, Voiture.createVoiture);
 
module.exports = Router;