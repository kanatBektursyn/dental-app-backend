const mongoose = require("mongoose");

const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    _id: String,
    text: String,
    createdAt: String,
    user: { name: String, _id: String },
  },
  {
    timestamps: true,
  }
);
{
  /* 
This MAY BE useful, MAY BE not. Just for future.

PatientSchema.virtual("messages", {
  ref: "Patient",
  localField: "_id",
  foreignField: "_id",
  justOne: false,
});*/
}

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
