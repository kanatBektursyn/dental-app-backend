const express = require("express");
const cors = require("cors");

const db = require("./core/db");
const {
  patientValidation,
  appointmentValidation,
} = require("./utils/validations");
const { PatientCtrl, AppointmentCtrl } = require("./controllers");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/patients", PatientCtrl.all);
app.post("/patients", patientValidation.create, PatientCtrl.create);

app.get("/appointments", AppointmentCtrl.all);
app.post("/appointments", appointmentValidation.create, AppointmentCtrl.create);
app.delete("/appointments/:id", AppointmentCtrl.remove);
app.patch(
  "/appointments/:id",
  appointmentValidation.update,
  AppointmentCtrl.update
);

app.listen(6666, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("Server is running!");
});
