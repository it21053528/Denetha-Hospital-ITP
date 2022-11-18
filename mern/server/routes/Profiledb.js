const router = require("express").Router();
const Profiledb = require("../models/ProfileModel");
const { get } = require("mongoose");

router.route("/get").post(async (req, res) => {
  const id = req.body.id;
  await Profiledb.find({ id })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(200).send({ message: "No user" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error: Account not found", error: err.message });
    });
});

router.route("/add").post(async (req, res) => {
  const id = req.body.id;
  const contactno = req.body.contactno;
  const address = req.body.address;
  const email = req.body.email;
  const dob = req.body.dob;

  const newProfile = new Profiledb({
    id,
    contactno,
    address,
    email,
    dob,
  });
  newProfile
    .save()
    .then(() => {
      res.json("New data is added.");
    })
    .catch((err) => {
      console.log(err);
    });
});

//update profile
router.route("/update").post(async (req, res) => {
  const id = req.body.docId;

  const UpdateProfile = {
    contactno: req.body.contactno,
    address: req.body.address,
    email: req.body.email,
    dob: req.body.dob,
  };

  await Profiledb.findByIdAndUpdate(id, UpdateProfile)
    .then((result) => {
      res
        .status(200)
        .send({ message: "Update successful", update: UpdateProfile });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error: Update unsuccessful", error: err.message });
    });
});

//delete profile
router.route("/delete").post(async (req, res) => {
  const profileId = req.body.pid;

  await Profiledb.findByIdAndDelete(profileId)
    .then((result) => {
      res.status(200).send({ message: "Profile Deleted" });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error: Delete unsuccessful", error: err.message });
    });
});

module.exports = router;
