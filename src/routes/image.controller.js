const express = require('express');
const Image = require('../models/image');
const Qr = require('../models/QR');
const router = new express.Router();

/*file management*/
const fs = require('fs');
const qrcode = require('qrcode');

router.post('/api-images/create', async (req, res, next) => {
    try {
        const imageBody = req.body;//{ imageBase, codProduct, idProduct}
        const imageToCreate = await new Image(imageBody).save();

        console.log('Aqui estoy');

        await createQR(imageBody.idProduct);

        return res.status(200).send(imageToCreate);
    } catch(error) {
        return res.status(500).send(error);
    }
});

router.get('/api-images/:idProduct/:codProduct', async (req, res, next) => {
    try {
        const idProduct = req.params.idProduct;
        const codProduct = req.params.codProduct;

        const imageFinded = await Image.findOne({idProduct: idProduct, codProduct: codProduct});

        return res.status(201).send(imageFinded);
    } catch(error) {
        return res.status(500).send(error);
    }
});

const createQR = async (id) => {

    const b64string = await qrcode.toDataURL(`https://goodwood-qr.azurewebsites.net/product/view/${id}`);

    const base64Alone = b64string.split('data:image/png;base64,')

    const buf = Buffer.from(base64Alone[1], 'base64');

    const qrToCreate = {
        idProduct: id,
        qr: buf
    };

    await new Qr(qrToCreate).save();
}

router.get('/api-images-qr/:id', async (req, res) => {

    try {
        const id = req.params.id;

        const qrInBd = await Qr.findOne({ idProduct: id });

        if (qrInBd == null) {
            throw new Error();
        }

        res.set('Content-Type', 'image/jpg');
        return res.send(qrInBd.qr);

    } catch(e) {
        return res.status(404).send();
    }
});

module.exports = router;