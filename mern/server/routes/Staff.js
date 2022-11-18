const router = require("express").Router();
let Staff = require("../models/StaffModel.js");
const { get } = require("mongoose");

router.route("/add").post(async (req, res) => {
  const staff = req.body;
  const newStaff = new Staff(staff);

  try {
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    res.json({ message: error });
  }
});

//get staff details by giving id of that staff member
router.route("/get/:id").get(async (req, res) => {
  const staffId = req.params.id;

  await Staff.findById(staffId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error: Staff id not found", error: err.message });
    });
});

//display all the satff details
router.route("/").get((req, res) => {
  Staff.find()
    .then((staff) => {
      res.json(staff);
    })
    .catch((err) => {
      res.status(500).send({ status: "", error: err.message });
    });
});

//another way to do get method
/*
router.route('/').get((req,res)=>{
    Staff.find().then((staff)=>{
        res.json(staff)
    }).catch((err)=>{
        console.log(err)
    })
})
*/

router.route("/search").post(async (req, res) => {
  Staff.find()
    .then((staff) => {
      res.json(staff);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
