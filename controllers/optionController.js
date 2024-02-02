const User   = require('../modeles/user.js');
const Option = require('../modeles/options.js');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// Middlewares
exports.authenticator = async (req, res, next) => {
    const token = req.body.token ? req.body.token : req.headers.authorization;
    console.log(token);
    if (token) {
        try {
            let decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log(decoded);
            if (decoded) {
              const user = await User.findOne({ where: { email: decoded.email } });
            
              if (!user) {
                return res.status(401).json('Unauthorized: Utilisateur non trouvé');
              }
                const userData = user.dataValues || user;
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


exports.getOptions = async (req, res) => {
    try {
        const options = await Option.findAll({
            where: { modeleId: req.params.id },
            attributes: ['type', 'value', 'prix']
        });
        console.log(options);
        res.json(options);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
};

exports.createOption = async (req, res) => {
    try {
        const option = await Option.create(req.body);
        res.json(option);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
};