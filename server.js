const express = require('express');
const app = express();
const sequelize = require('./database/database');
const cors = require('cors');
app.set('view engine', 'ejs');

const voiture = require('./routes/voitureRoute');

app.use(cors());
app.use(express.json());
app.use('/raudi', voiture);

app.listen(8000, () => {
    console.log('Server port 8000');
    sequelize.sync();
});