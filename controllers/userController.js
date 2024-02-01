// controllers/inscriptionController.js
const User  = require('../modeles/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ 
        where: { email: req.body.email } });

    if (existingUser) {
      return res.status(400).json({ error: 'Erreur : email déjà utilisé' });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: 'admin', // Vous pouvez ajuster le rôle selon vos besoins
    });

    // Génération et envoi du JWT Token
    const token = jwt.sign({ email, role: newUser.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Recherche de l'utilisateur par email
      const user = await User.findOne({ where: { email } });
  
      // Vérifiez si l'e-mail existe
      if (!user) {
        return res.status(400).json({ error: 'Erreur : email non existant' });
      }
  
      // Vérifiez si le mot de passe est correct
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(400).json({ error: 'Erreur : mot de passe incorrect' });
      }
  
      // Générez le token JWT et renvoyez-le en réponse
      const token = jwt.sign({ email, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
};