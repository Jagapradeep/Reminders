const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const Remainder = mongoose.model(
  "Remainder",
  new mongoose.Schema({
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
    date: {
      type: Object,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  })
);

function validateRemainder(remainder) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).label("Name").required(),
    description: Joi.string().min(3).max(1024).label("Description").required(),
    date: Joi.object().label("Date").required(),
    email: Joi.string().email().label("E-Mail").required(),
  });
  return schema.validate(remainder);
}

exports.Remainder = Remainder;
exports.validate = validateRemainder;
