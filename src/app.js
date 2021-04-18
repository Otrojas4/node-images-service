const express = require('express');
const cors = require('cors');
require('./db/mongoose');

const imageRouter = require('./routes/image.controller');

const app = express();

app.use(express.json());

app.use(cors());



app.use(imageRouter);


module.exports = app;
