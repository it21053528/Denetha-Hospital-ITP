const router = require ("express").Router();
const { get } = require("mongoose");
//const Surgery = require("../models/SurgeryModel");
let diagnosis1 = require("../models/DiagnosisModel");

router.route("/add").post((req,res)=>{
    const pname= req.body.pname;
    const ward = req.body.ward;
    const Regno = Number(req.body.Regno);
    const age = Number(req.body.age);
    const DAddmission = Date(req.body.DAddmission);
    const Ddischarge = Date(req.body.Ddischarge);
    const Dsurgery = Date(req.body.Dsurgery);
    const PHACO = req.body.PHACO;
    const IOL = req.body.IOL;
    const variable = req.body.variable;

    const diagnosisAdd = new diagnosis1 ({
        pname,ward,Regno,age,DAddmission,Ddischarge,Dsurgery,PHACO,IOL,variable
    })
    diagnosisAdd.save().then(()=>{
        res.json("Details Added")
    }).catch(()=>{
        // console.log(err.message);
    })

})
//Retriew data from database
router.route("/").get((req,res)=>{
    diagnosis1.find().then((diagnosis)=>{
        res.json(diagnosis)
    }).catch((err)=>{
        console.log(err.message);
    })
})
//update data
router.route("/update/:pid").put(async(req,res)=>{
        let sid = req.params.pid;
        //destructure
        const{pname,ward,Regno,age,DAddmission,Ddischarge,Dsurgery,PHACO,IOL,variable} = req.body;

        const updatedata = {
            pname,ward,Regno,age,DAddmission,Ddischarge,Dsurgery,PHACO,IOL,variable
        }

        const update = await diagnosis1.findByIdAndUpdate(sid,updatedata)
        .then(()=>{
            res.status(200).send({status:"Updated Diagnosis Card"})  
        }).catch((err)=>{
            console.log(err.message);
            res.status(500).send({status:"Error with updating data",error:err.message});
            })

        })

router.route("/delete/:pid").delete(async(req,res)=>{
    let sid = req.params.pid;

    await diagnosis1.findByIdAndDelete(sid).then(()=>{
        res.status(200).send({status:"Details Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting user",error:err.message})
}) 

}) 

router.route("/get/:pid").post(async (req,res)=>{
    let sid = req.params.pid;
    const user = await diagnosis1.findById(sid).then((data)=>{
        res.status(200).send(data);
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user Details",error:err.message});
})
})



module.exports = router;
