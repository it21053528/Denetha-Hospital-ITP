const router = require('express').Router();
let doctor = require('../models/DoctorModel');


//save doctors
// router.post('/save',(req,res)=>{

//     let newDoctor = new Doctors(req.body);

//     newDoctor.save((err)=>{
//         if(err){
//             return res.status(400).json({
//                 error:err
//             });
//         }
//         return res.status(200).json({
//             success:"Doctor saved successfully"
//         });
//     });

// });

//display doctor
router.route('/get').post(async (req, res) => {
    await doctor.find().then((result)=>{
        if(result){
            res.json(result);
        }else {
            res.status(200).send({message: 'Cannot find'});
        }
    }).catch((err) => {
            res.status(500).send({status: '', error: err.message});
    });
});

//add new doctor
router.route("/add").post((req,res)=>{
     const name = req.body.name;
     const email = req.body.email;
     const mobile = req.body.mobile;
     const specialization = req.body.specialization;
     const desc = req.body.desc;

     const newDoctor = new doctor({
        name,
        email,
        mobile,
        specialization,
        desc
     });

     
     newDoctor.save().then(()=>{
        res.json("New doctor added successfully.")
     }).catch((err)=>{
        console.log(err); 
     });
});

//update doctor
router.route('/update/:id').put(async (req, res) => {
    
    let userId = req.params.id;
    
    const {
        name,
        email,
        mobile,
        specialization,
        desc
    } = req.body;

    //update values
    const updateDoctor = {
        name,
        email,
        mobile,
        specialization,
        desc
    };

     await doctor.findByIdAndUpdate(userId, updateDoctor).then(() => {
        res.status(200).send({message:'Update successful'})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: 'Error: Update unsuccessful', error: err.message});
    });
});

//delete doctor
router.route('/delete/:id').delete(async (req, res) => {
    
    let userId = req.params.id;

    await doctor.findByIdAndDelete(userId).then(() => {
        res.status(200).send({message:'User Deleted'});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: 'Error: Delete unsuccessful', error: err.message});
    });
});

//get doctor
router.route('/getuser/:id').get(async (req, res) => {

    let userId = req.params.id;

    await doctor.findById(userId).then((student)=>{
        res.status(200).send({message:'User Fetched',student});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: 'Error: Fetch unsuccessful', error: err.message});
    });
});

module.exports = router;

