const express = require('express');
const app = express();
const sequelize = require('./database/database');
const cors = require('cors');

const voiture = require('./routes/voitureRoute');
const user = require('./routes/userRoute');
const achat = require('./routes/comptaRoute');
const option = require('./routes/optionRoute');

app.use(cors());
app.use(express.json());

app.use('/raudi', voiture);
app.use('/user', user);
app.use('/raudi', achat);
app.use('/option', option);

app.listen(8000, () => {
    console.log('Server port 8000');
    sequelize.sync();
});