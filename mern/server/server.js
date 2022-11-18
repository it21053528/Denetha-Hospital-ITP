const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

const pdf = require('html-pdf');
const pdfTemplate = require('./documents');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }

      res.send(Promise.resolve());
  });
});

app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`)
})

//routes
const accountRouter = require("./routes/Accounts");
app.use("/api/account", accountRouter);

const PORouter = require("./routes/PurchaseOrders");
app.use("/api/purchaseOrder", PORouter);

const pettyCashRouter = require("./routes/PettyCashRecords");
app.use("/api/pettyCash", pettyCashRouter);

const transactionsRouter = require("./routes/Transactions");
app.use("/api/transactions", transactionsRouter);

const patientRouter = require("./routes/Patients");
app.use("/api/patient", patientRouter);

const appoinmentRouter = require('./routes/Appoinment');
app.use('/api/appointment', appoinmentRouter);

const meetingRouter = require("./routes/Meeting");
app.use("/api/meeting", meetingRouter);

const inventory = require('./routes/Inventory');
app.use('/api/inventory' , inventory);

// const inventory = require('./routes/Inventorytable');
// app.use('/api/Inventorytable' , Inventorytable);

const profileRouter = require("./routes/Profiledb");
app.use("/api/profile", profileRouter);

const staffRouter = require("./routes/Staff");
app.use("/api/staffdetails", staffRouter);

// const EditappoinmentRouter = require('./routes/EditAppoinment');
// app.use('/api/Editappointment', EditappoinmentRouter);

const HelpRouter = require("./routes/Help");
app.use("/api/help", HelpRouter);

const surgeryRouter = require("./routes/Surgery");
app.use("/api/surgery", surgeryRouter);

const diagnosisRouter = require("./routes/DiagnosisRoute");
app.use("/api/diagnosis", diagnosisRouter);

const receiptRouter = require("./routes/Receipts");
app.use("/api/receipt", receiptRouter);

const doctorRouter = require("./routes/Doctor");
app.use("/api/doctor",doctorRouter);

const recordsRouter = require("./routes/DoctorRecords");
app.use("/api/DoctorRecords",recordsRouter);

const appTypeRouter = require("./routes/AppType");
app.use("/api/AppType",appTypeRouter);

// const addpatientRouter = require("./routes/AddPatient");
// app.use("./api/addpatient", addpatientRouter);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(port, () => {
  //Perform a database connection when server start
  mongoose.connect(process.env.ATLAS_URI).then(() => {
    console.log("connected to mongoDB");
  });
  console.log(`Server is running on port: ${port}`);
});
