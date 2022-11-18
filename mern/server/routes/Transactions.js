const router = require('express').Router();
const receipt = require('../models/ReceiptModel');

router.route('/get').post(async (req, res) => {
    const date = req.body.date;

    await receipt.find({date}).then((result) => {
        res.json(result);
    }).catch(err => console.log(err));
});

router.route('/edit').post(async (req, res) => {
    const id = req.body.id;

    const {date, type, amount, name} = req.body;

    const data = {date, name, type, amount};

    await receipt.findByIdAndUpdate(id, data).then((result) => {
        res.status(200).send({message: 'Receipt record updated'});
    }).catch(err => console.log(err));
});

module.exports = router;