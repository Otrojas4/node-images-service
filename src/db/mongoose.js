const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://wooduser:GksycHFKhlKz3pqx@cluster0.4etrs.mongodb.net/db-images', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});