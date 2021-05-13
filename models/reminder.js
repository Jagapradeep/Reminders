const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const Reminder = mongoose.model(
  "Reminder",
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024,
    },
    reminderDate: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  })
);

function validateReminder(reminder) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    name: Joi.string().min(3).max(50).label("Name").required(),
    description: Joi.string().min(3).max(1024).label("Description").required(),
    dateTime: Joi.object().label("Date and Time").required(),
    email: Joi.string().email().label("E-Mail").required(),
  });
  return schema.validate(reminder);
}

exports.Reminder = Reminder;
exports.validate = validateReminder;
