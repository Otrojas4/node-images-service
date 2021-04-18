const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
    {
        imageBase: {
            type: String,
            required: true,
        },
        codProduct: {
            type: String,
            required: true,
        },
        idProduct: {
            type: Number,
            required: true,
        },

    }, {
        timestamps: true
    }
);

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
