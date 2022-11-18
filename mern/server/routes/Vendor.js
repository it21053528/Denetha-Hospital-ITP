const router = require('express').Router();
const vendor = require('../models/PurchaseOrderModel');

router.route('/record').post(async (req, res) => {

    const {
        vendorcode,
        vendorname,
        contactno,
        address,
        emailaddress,
        type,
        status,
    } = req.body;

    const newRecord = new vendor({
        vendorcode,
        vendorname,
        contactno,
        address,
        emailaddress,
        type,
        status,});
    
       await newRecord.save().then((result)=>{
            res.json(result);
    
        }).catch((err)=>{
            console.log(err);
        })
       
});

module.exports = router;