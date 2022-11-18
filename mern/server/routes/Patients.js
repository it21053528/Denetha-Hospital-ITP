const router = require('express').Router();
const patient = require('../models/PatientModel');

router.route('/search').post(async(req, res) => {

        patient.find().then((patients)=>{
            res.json(patients);
    
        }).catch((err)=>{
            console.log(err);
        })

});

router.route('/insert').post(async(req, res) => {

    const {
        name,
        age,
        gender,
        dob,
        address,
        phone,
        gname,
        gnumber,
        checkboxCall,
        checkboxMsg,
        remarks
    } = req.body;

    const addpatient = new patient ({name, age, gender, dob, address,
                                    phone, gname, gnumber, checkboxCall,
                                    checkboxMsg, remarks});

    await addpatient.save().then(() => {
        res.json("Receipt added");
    }).catch((err) => {
        console.log(err);
    });
    
});

//Retrieve data from database
router.route('/get').get(async(req, res) => {
    patient.find().then((patient)=>{
        res.json(patient)
    }).catch((err)=>{
        console.log(err);
    })
});

//delete profile
router.route("/delete").post(async (req, res) => {
    const patientProfileId = req.body.pid;
  
    await patient.findByIdAndDelete(patientProfileId)
      .then((result) => {
        res.status(200).send({ message: "Patient Profile Deleted" });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ status: "Error: Delete unsuccessful", error: err.message });
      });
  });

  router.route("/get").post(async (req, res) => {
    const id = req.body.id;
    await patient.find({ id })
      .then((result) => {
        if (result) {
          res.json(result);
        } else {
          res.status(200).send({ message: "No Patient" });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ status: "Error: Patient not found!", error: err.message });
      });
  });


  //update profile
router.route("/update").post(async (req, res) => {
  const id = req.body.docId;

  const UpdateProfile = {
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    dob: req.body.dob,
    address: req.body.address,
    phone: req.body.phone,
    gname: req.body.gname,
    gnumber: req.body.gnumber,
    remarks: req.body.remarks
  };

  await patient.findByIdAndUpdate(id, UpdateProfile)
    .then((result) => {
      res.status(200).send({ message: "Updated Successfully!" });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error: Account not found", error: err.message });
    });

});

module.exports = router;