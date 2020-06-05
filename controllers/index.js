const PatientController = require("./PatientController");
const AppointmentController = require("./AppointmentController");
const MessageController = require("./MessageController");

module.exports = {
  PatientCtrl: new PatientController(),
  AppointmentCtrl: new AppointmentController(),
  MessageCtrl: new MessageController(),
};
