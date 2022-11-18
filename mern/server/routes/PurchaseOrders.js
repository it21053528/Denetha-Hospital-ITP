const router = require('express').Router();
const PO = require('../models/PurchaseOrderModel');

router.route('/add').post(async (req, res) => {
    const {
        poRoot,
        poNumber,
        vendor,
        date,
        editor,
        mode,
        items
    } = req.body;

    const currentDate = Date.now();

    const newPO = new PO({poRoot, poNumber, vendor, date, lastEdit: currentDate, editor, mode, items});

    await newPO.save().then(() => {
        res.status(200).send({status: 'PO added'});
    }).catch((err) => {
        res.status(500).send({status: 'Error: PO not added', error: err.message});
    });
});

router.route('/get').post(async (req, res) => {
    await PO.find().then((result)=>{
        if(result){
            res.json(result);
        }else {
            res.status(200).send({message: 'No Purchase orders. Create one using the add button.'});
        }
    }).catch((err) => {
        res.status(500).send({status: 'Error: Account not found', error: err.message});
    });
});

router.route('/update/:oid').post(async (req, res) => {
    const {
        poRoot,
        poNumber,
        vendor,
        date,
        editor,
        mode,
        items
    } = req.body;

    const currentDate = Date.now();
    const oid = req.params.oid;

    const updatePO = {poRoot, poNumber, vendor, date, lastEdit: currentDate, editor, mode, items};

    await PO.findByIdAndUpdate(oid, updatePO).then((result) => {
        res.status(200).send({message:'Update successful', update: updatePO})
    }).catch((err) => {
        res.status(500).send({status: 'Error: Update unsuccessful', error: err.message});
    });
});

router.route('/delete/:oid').post(async (req, res) => {
    const oid = req.params.oid;

    await PO.findByIdAndDelete(oid).then((result) => {
        res.status(200).send({message:'PO Deleted'});
    }).catch((err) => {
        res.status(500).send({status: 'Error: Delete unsuccessful', error: err.message});
    });
});

module.exports = router;