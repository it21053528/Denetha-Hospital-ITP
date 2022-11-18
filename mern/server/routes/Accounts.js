const router = require("express").Router();
const account = require("../models/AccountModel");
const bcrypt = require("bcryptjs");

router.route("/add").post(async (req, res) => {
  const { name, username, password, role } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newAccount = new account({ name, username, password: hash, role });

  await newAccount
    .save()
    .then(() => {
      res.status(200).send({ status: "Account added" });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error: Account not added", error: err.message });
    });
});

router.route("/").post(async (req, res) => {
  await account
    .find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send({ status: "Error", error: err.message });
    });
});

router.route("/check").post(async (req, res) => {
  const { username, password } = req.body;

  await account
    .find({ username })
    .then((result) => {
      if (result[0]) {
        if (bcrypt.compareSync(password, result[0].password)) {
          res.json(result);
        } else {
          res.status(200).send({ message: "invalidPass" });
        }
      } else {
        res.status(200).send({ message: "invalidUser" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error: Account not found", error: err.message });
    });
});

router.route("/update/:oid").post(async (req, res) => {
  const { name, username, password, role } = req.body;
  const oid = req.params.oid;
  let updateAccount = {};

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    updateAccount = { password: hash };
  } else {
    updateAccount = { name, username, role };
  }

  await account
    .findByIdAndUpdate(oid, updateAccount)
    .then(() => {
      res
        .status(200)
        .send({ status: "Account updated", update: updateAccount });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error: Account update failed", error: err.message });
    });
});

router.route("/delete/:oid").delete(async (req, res) => {
  const oid = req.params.oid;

  await account
    .findByIdAndDelete(oid)
    .then((result) => {
      res.status(200).send({ message: "Account Deleted" });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error: Delete unseccessful", error: err.message });
    });
});

module.exports = router;
