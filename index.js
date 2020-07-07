const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

const {
  patientValidation,
  appointmentValidation,
} = require("./utils/validations");
const { PatientCtrl, AppointmentCtrl, MessageCtrl } = require("./controllers");

app.get("/patients", PatientCtrl.all);
app.post("/patients", patientValidation.create, PatientCtrl.create);
app.delete("/patients/:id", PatientCtrl.remove);
app.patch("/patients/:id", patientValidation.update, PatientCtrl.update);
app.get("/patients/:id", PatientCtrl.show);

app.get("/appointments", AppointmentCtrl.all);
app.post("/appointments", appointmentValidation.create, AppointmentCtrl.create);
app.delete("/appointments/:id", AppointmentCtrl.remove);
app.patch(
  "/appointments/:id",
  appointmentValidation.update,
  AppointmentCtrl.update
);

app.get("/messages", MessageCtrl.all);
app.post("/messages", MessageCtrl.create);

app.listen(process.env.PORT || 6666, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("Server is running!");
});
