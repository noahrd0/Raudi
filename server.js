const express = require('express');
const app = express();
const sequelize = require('./database/database');
const cors = require('cors');
app.set('view engine', 'ejs');

const voiture = require('./routes/voitureRoute');
const user = require('./routes/userRoute');

app.use(cors());
app.use(express.json());

app.use('/raudi', voiture);
app.use('/raudi', user);

app.listen(8000, () => {
    console.log('Server port 8000');
    sequelize.sync();
});