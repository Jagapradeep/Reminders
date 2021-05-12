const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { Remainder, validate } = require("../models/remainder");

router.get("/", async (req, res) => {
  const remainders = await Remainder.find();
  res.send(remainders);
});

router.get("/:id", async (req, res) => {
  const remainder = await Remainder.findById(req.params.id);
  if (!remainder)
    return res.status(404).send("There is no remainder with the given ID.");
  res.send(remainder);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  remainder = new Remainder(
    _.pick(req.body, ["name", "description", "time", "email"])
  );
  remainder = await remainder.save();

  res.send(_.pick(remainder, ["_id"]));
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, description, time, email } = req.body;

  const remainder = await Remainder.findByIdAndUpdate(
    req.params.id,
    { name, description, time, email },
    { new: true }
  );
  if (!remainder)
    return res.status(404).send("There is no remainder with the given ID.");

  res.send(remainder);
});

router.delete("/:id", async (req, res) => {
  const remainder = await Remainder.findByIdAndDelete(req.params.id);
  if (!remainder)
    return res.status(404).send("There is no remainder with the given ID.");
  res.send(remainder);
});

module.exports = router;
