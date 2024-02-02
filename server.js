const express = require('express');
const app = express();
const sequelize = require('./database/database');
const cors = require('cors');

const User = require('./modeles/user');
const Voiture = require('./modeles/voiture');
const Achat = require('./modeles/achat');

const voiture = require('./routes/voitureRoute');
const user = require('./routes/userRoute');
const achat = require('./routes/comptaRoute');

app.use(cors());
app.use(express.json());

app.use('/raudi', voiture);
app.use('/user', user);
app.use('/raudi', achat);

app.listen(8000, () => {
    console.log('Server port 8000');
    sequelize.sync();
});