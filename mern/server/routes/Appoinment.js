const router = require('express').Router();
const Appoinment = require('../models/AppoinmentModel');

router.route('/record').post(async (req, res) => {

    const {
        name,
        address,
        phone,
        age,
        gender,
        appoinmentnumber,
        type,
        date,
        time,
        doctor,
    } = req.body;

    const newRecord = new Appoinment({
        name,
        address,
        phone,
        age,
        gender,
        appoinmentnumber,
        type,
        date,
        time,
        doctor,});

    
    await newRecord.save().then((result)=>{
        res.json(result);

    }).catch((err)=>{
        console.log(err);
    }) 
});

router.route("/update/:pid").post(async(req,res)=>{
    let sid = req.params.pid;
    //destructure
    const{name,address,phone,age,gender,appoinmentnumber,type,date,time,doctor} = req.body;

    const updatedata = {
        name,address,phone,age,gender,appoinmentnumber,type,date,time,doctor
    }

    const update = await Appoinment.findByIdAndUpdate(sid,updatedata)
    .then(()=>{
        res.status(200).send({status:"Updated Appoitnment details"})  
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
        })

    })

router.route("/delete/:pid").delete(async(req,res)=>{
    let sid = req.params.pid;
    await Appoinment.findByIdAndDelete(sid).then(()=>{
        res.status(200).send({status:"Details Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting user",error:err.message})
})
})

router.route("/get/:pid").post(async(req,res)=>{
    let pid = req.params.pid;
    await Appoinment.findById(pid).then((data)=>{
        res.status(200).send(data);
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting user",error:err.message})
    })
})

router.route("/all").post((req,res)=>{
    Appoinment.find().then((result)=>{
        res.json(result)
    }).catch((err)=>{
        console.log(err);
    })
})




module.exports = router;