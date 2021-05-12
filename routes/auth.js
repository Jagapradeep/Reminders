const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid User or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid User or password");

  const token = user.generateAuthToken();
  res.send({ _id: user._id, token });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().label("E-Mail").required(),
    password: Joi.string().label("Password").required(),
  });
  return schema.validate(req);
}

module.exports = router;
