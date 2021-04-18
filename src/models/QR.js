const mongoose = require('mongoose');

const qrSchema = new mongoose.Schema(
    {
        idProduct: {
            type: Number,
            required: true,
        },
        qr: {
            type: Buffer,
            required: true,
        },

    }, {
        timestamps: true
    }
);

const Qr = mongoose.model('Qr', qrSchema);

module.exports = Qr;
