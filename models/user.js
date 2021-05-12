const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female", "Other"],
      message: "{VALUE} is not supported",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
};

const User = mongoose.model("User", userSchema);

const complexityOptions = {
  min: 5,
  max: 255,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
  required: true,
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).label("Name").required(),
    gender: Joi.string()
      .valid("Male", "Female", "Other")
      .label("Gender")
      .required(),
    email: Joi.string().email().label("E-Mail").required(),
    password: passwordComplexity(complexityOptions),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
