const router = require('express').Router();
let DoctorRecord = require('../models/DoctorRecordModel');

router.route('/').get((req, res) => {
    DoctorRecord.find()
    .then(doctorRecords => res.json(doctorRecords))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const docName = req.body.docName;
  const appType = req.body.appType;
  const totalPatients = Number(req.body.totalPatients);
  const charge = Number(req.body.charge);
  const date = Date.parse(req.body.date);

  const newDoctorRecord = new DoctorRecord({
    docName,
    appType,
    totalPatients,
    charge,
    date,
  });

  newDoctorRecord.save()
  .then(() => res.json('Record added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    DoctorRecord.findById(req.params.id)
      .then(doctorRecords => res.json(doctorRecords))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    DoctorRecord.findByIdAndDelete(req.params.id)
      .then(() => res.json('Record deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    DoctorRecord.findById(req.params.id)
      .then(doctorRecords => {
        doctorRecords.docName = req.body.docName;
        doctorRecords.appType = req.body.appType;
        doctorRecords.totalPatients = Number(req.body.totalPatients);
        doctorRecords.charge = Number(req.body.charge);
        doctorRecords.date = Date.parse(req.body.date);
  
        doctorRecords.save()
          .then(() => res.json('Record updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;