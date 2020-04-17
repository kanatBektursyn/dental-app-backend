const { Patient } = require("../models");
const { validationResult } = require("express-validator");

function PatientController() {}

const create = function (req, res) {
  const errors = validationResult(req);

  const data = {
    fullname: req.body.fullname,
    phone: req.body.phone,
  };

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array(),
    });
  }
  Patient.create(data, function (err, doc) {
    if (err) {
      return res.status(500).json({});
    }
    res.status(201).json({
      success: true,
      message: doc,
    });
  });
};

const remove = async function (req, res) {
  const id = req.params.id;

  try {
    await Patient.findOne({ _id: id });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: "PATIENT_NOT_FOUND",
    });
  }

  Patient.deleteOne({ _id: id }, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err,
      });
    }
    res.json({
      status: "success",
    });
  });
};

const update = async function (req, res) {
  const patientId = req.params.id;
  const errors = validationResult(req);

  const data = {
    fullname: req.body.fullname,
    phone: req.body.phone,
  };

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array(),
    });
  }

  Patient.updateOne({ _id: patientId }, { $set: data }, function (err, doc) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err,
      });
    }
    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "PATIENT_NOT_FOUND",
      });
    }
    res.status(200).json({
      success: true,
    });
  });
};

const show = async function (req, res) {
  const id = req.params.id;

  try {
    const patient = await Patient.findById(id).populate("appointments").exec();

    res.json({
      status: true,
      data: { ...patient._doc, appointments: patient.appointments },
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: "PATIENT_NOT_FOUND",
    });
  }
};

const all = function (req, res) {
  Patient.find({}, function (err, docs) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err,
      });
    }

    res.json({
      success: true,
      data: docs,
    });
  });
};

PatientController.prototype = {
  all,
  create,
  remove,
  update,
  show,
};

module.exports = PatientController;
