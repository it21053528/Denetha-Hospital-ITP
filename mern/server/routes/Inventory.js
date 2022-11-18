const router = require('express').Router();
const inventory = require('../models/Inventory');
// let inventory = require("../models/Inventory");
router.route('/record').post(async (req, res) => {
    // console.log(req);
    // console.log("line06");

    const {
        Itemcode,
        Itemname,
        Vendorcode,
        Location,
        Quantity,
        Cost,
        Status
    } = req.body;

    const newRecord = new inventory({
        Itemcode,
        Itemname,
        Vendorcode,
        Location,
        Quantity,
        Cost,
        Status});
        console.log(req);
    
       await newRecord.save().then((result)=>{
            res.json(result);
    
        }).catch((err)=>{
            console.log(err);
        })

});

//Retriew data from database
router.route("/").get((req,res)=>{
    inventory.find().then((inventory)=>{
        res.json(inventory)
    }).catch((err)=>{
        console.log(err);
    })
})
//update data
router.route("/update/:pid").put(async(req,res)=>{
    let sid = req.params.pid;
    //destructure
    const{Itemcode,
        Itemname,
        Vendorcode,
        Location,
        Quantity,
        Cost,
        Status} = req.body;

    const updatedata = {
        Itemcode,
        Itemname,
        Vendorcode,
        Location,
        Quantity,
        Cost,
        Status
    }

    const update = await inventory.findByIdAndUpdate(sid,updatedata)
    .then(()=>{
        res.status(200).send({status:"Updated Inventory details"})  
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
        })

    })

    router.route("/delete/:pid").delete(async(req,res)=>{
    let sid = req.params.pid;

    await inventory.findByIdAndDelete(sid).then(()=>{
        res.status(200).send({status:"Details Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting user",error:err.message})
    })

    })

    router.route("/get/:pid").get(async (req,res)=>{
    let sid = req.params.pid;
    const user = await inventory.findById(sid).then(()=>{
        res.status(200).send({status:"User fetched"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user",error:err.message});

        })
                         
    })
    
    router.route("/").get((req,res)=>{
        inventory.find().then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err);
        })
    })

    
module.exports = router;
