const router = require("express").Router();
let meeting = require("../models/MeetingModel.js");
const { get } = require("mongoose");

//display all meetings
router.route("/").get(async (req, res) => {
  // meeting.find().then((result)=>{
  //         res.json(result)
  // }).catch((err) => {
  //         res.status(500).send({status: '', error: err.message});
  // })
  try {
    const meetings = await meeting.find();
    res.status(200).json(meetings);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

//add new meeting to the database
router.route("/add").post((req, res) => {
  const date = req.body.date;
  const time = req.body.time;
  const host = req.body.host;
  const description = req.body.description;

  const newMeeting = new meeting({
    date,
    time,
    host,
    description,
  });

  //js prons
  newMeeting
    .save()
    .then(() => {
      res.json("New Meeting is added.");
    })
    .catch((err) => {
      console.log(err);
    });
});

//update meetings
router.route("/update/:id").put(async (req, res) => {
  const id = req.params.id;
  const update = req.body;

  console.log(id);
  console.log(update);

  await meeting
    .findByIdAndUpdate(id, update)
    .then((result) => {
      res.status(200).send({ message: "Update successful" });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

//delete meetings
router.route("/delete/:meetingid").delete(async (req, res) => {
  const deleteMeeting = req.params.meetingid;

  await meeting
    .findByIdAndDelete(deleteMeeting)
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
