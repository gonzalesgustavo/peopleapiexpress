const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
const path = require('path');
const bodyParser = require('body-parser');

const homeRouter = require('./routes/index');
const peopleRouter = require('./routes/people');

const app = express();

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log(err);
    console.log('connected to database');
});

mongoose.set('useFindAndModify', false);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', homeRouter);
app.use('/people', peopleRouter);


app.listen(process.env.PORT, () => {
    console.log(`app running on http://localhost:${process.env.PORT}`);
})