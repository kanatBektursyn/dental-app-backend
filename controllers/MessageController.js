const { Patient } = require("../models");
const { validationResult } = require("express-validator");

function MessageController() {}

const create = function (req, res) {
  const errors = validationResult(req);

  const data = {
    _id: req.body._id,
    text: req.body.text,
    createdAt: req.body.createdAt,
    user: { name: req.body.fullname, _id: req.body.fullname },
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

MessageController.prototype = {
  all,
  create,
  remove,
};

module.exports = MessageController;
