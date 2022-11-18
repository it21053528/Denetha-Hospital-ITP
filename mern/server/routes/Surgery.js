const router = require ("express").Router();
const { get } = require("mongoose");
//const Surgery = require("../models/SurgeryModel");
let surgery1 = require("../models/SurgeryModel");

router.route("/add").post((req,res)=>{
    const pnumber= Number(req.body.pnumber);
    const pname = req.body.pname;
    const number = Number(req.body.number);
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const Stype = req.body.Stype;

    const surgeryadd = new surgery1 ({
        pnumber,pname,number,age,gender,Stype
    })
    surgeryadd.save().then(()=>{
        res.json("New Patient Added")
    }).catch((err)=>{
        console.log(err);
    })

})
//Retriew data from database
router.route("/").get((req,res)=>{
    surgery1.find().then((surgery)=>{
        res.json(surgery)
    }).catch((err)=>{
        console.log(err);
    })
})
//update data
router.route("/update/:pid").put(async(req,res)=>{
        let sid = req.params.pid;
        //destructure
        const{pnumber,pname,number,age,gender,Stype} = req.body;

        const updatedata = {
            pnumber,pname,number,age,gender,Stype
        }

        const update = await surgery1.findByIdAndUpdate(sid,updatedata)
        .then(()=>{
            res.status(200).send({status:"Updated Surgery details"})  
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({status:"Error with updating data",error:err.message});
            })

        })

router.route("/delete/:pid").delete(async(req,res)=>{
    let sid = req.params.pid;

    await surgery1.findByIdAndDelete(sid).then(()=>{
        res.status(200).send({status:"Details Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting user",error:err.message})
})

})

router.route("/get/:pid").get(async (req,res)=>{
    let sid = req.params.pid;
    const user = await surgery1.findById(sid).then((data)=>{
        res.status(200).send(data);
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user",error:err.message});

})
})

module.exports = router;
