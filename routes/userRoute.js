const express = require('express');
const Router = express.Router();
const User = require('../controllers/userController.js');

Router.post('/login', User.login);
Router.post('/register', User.register);

module.exports = Router;