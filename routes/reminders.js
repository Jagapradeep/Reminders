const _ = require("lodash");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Reminder, validate } = require("../models/reminder");
const {
  addSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../utils/scheduleReminder");

router.get("/", async (req, res) => {
  const reminders = await Reminder.find();
  res.send(reminders);
});

router.get("/:id", async (req, res) => {
  const reminder = await Reminder.findById(req.params.id);
  if (!reminder)
    return res.status(404).send("There is no reminder with the given ID.");
  res.send(reminder);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { userId, name, dateTime, description, email } = req.body;
  const { year, month, date, hour, minute } = dateTime;

  if (
    !(
      year &&
      date &&
      month != undefined &&
      hour != undefined &&
      minute != undefined
    )
  )
    return res
      .status(400)
      .send(
        `Please make sure all the values are included in "DateTime" object : "year, month, date, hour, minute"`
      );

  const reminderDate = new Date(year, month, date, hour, minute);

  reminder = new Reminder({
    userId,
    name,
    description,
    reminderDate,
    email,
  });
  reminder = await reminder.save();

  addSchedule(reminder._id);
  res.send(_.pick(reminder, ["_id"]));
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { userId, name, description, dateTime, email } = req.body;
  const { year, month, date, hour, minute } = dateTime;

  if (
    !(
      year &&
      date &&
      month != undefined &&
      hour != undefined &&
      minute != undefined
    )
  )
    return res
      .status(400)
      .send(
        `Please make sure all the values are included in "DateTime" object : "year, month, date, hour, minute"`
      );

  const reminderDate = new Date(year, month, date, hour, minute);

  const reminder = await Reminder.findByIdAndUpdate(
    req.params.id,
    { userId, name, description, reminderDate, email },
    { new: true }
  );
  if (!reminder)
    return res.status(404).send("There is no reminder with the given ID.");

  updateSchedule(reminder._id);
  res.send(reminder);
});

router.delete("/:id", auth, async (req, res) => {
  const reminder = await Reminder.findByIdAndDelete(req.params.id);
  if (!reminder)
    return res.status(404).send("There is no reminder with the given ID.");

  deleteSchedule(reminder._id);
  res.send(reminder);
});

module.exports = router;
