const mongoose = require("mongoose");

const { Schema } = mongoose;

const AppointmentSchema = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
    price: Number,
    dentNumber: Number,
    diagnosis: String,
    date: String,
    time: String,
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
