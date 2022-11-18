const router = require('express').Router();
let AppType = require('../models/AppTypeModel');

router.route('/').get((req, res) => {
    AppType.find()
    .then(appType => res.json(appType))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const appType = req.body.appType;

  const newAppType = new AppType({appType});

  newAppType.save()
    .then(() => res.json('Appointment type added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;