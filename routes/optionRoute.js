const express = require('express');
const Router = express.Router();
const Option = require('../controllers/optionController.js');

Router.get('/:id', Option.authenticator, Option.getOptions);
Router.post('/create', Option.createOption);

module.exports = Router;