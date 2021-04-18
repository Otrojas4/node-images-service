const express = require('express');
const Image = require('../models/image');
const router = new express.Router();

router.post('/api-images/create', async (req, res, next) => {
    try {
        const imageBody = req.body;//{ imageBase, codProduct, idProduct}
        const imageToCreate = await new Image(imageBody).save();

        return res.status(200).send(imageToCreate);
    } catch(error) {
        return res.status(500).send(error);
    }
});

module.exports = router;