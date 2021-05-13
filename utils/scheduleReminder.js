const schedule = require("node-schedule");
const nodemailer = require("nodemailer");
const config = require("config");
const { Reminder } = require("../models/reminder");
const { User } = require("../models/user");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hiddensierra1104@gmail.com",
    pass: `${config.get("mail-password")}`,
  },
});

const scheduleMail = async () => {
  const reminders = await Reminder.find();

  for (let reminder of reminders) {
    const user = await User.findById(reminder.userId);

    let mailOptions = {
      from: "hiddensierra1104@gmail.com",
      to: `${reminder.email}`,
      subject: `Reminder : ${reminder.name}`,
      text: `Hi ${user.name},
            
            You have scheduled a work to do now.
            "${reminder.description}"`,
    };

    const { reminderDate: d } = reminder;
    const job = schedule.scheduleJob(`${reminder._id}`, d, () => {
      // Send e-mail
      transporter.sendMail(mailOptions, function (error) {
        if (error) {
          console.log(error);
        } else {
          console.log(
            `Email sent to ${reminder.email} regarding the reminder "${reminder.name}"`
          );
        }
      });
    });
  }
};

const addSchedule = async (reminderId) => {
  const reminder = await Reminder.findById(reminderId);
  const user = await User.findById(reminder.userId);

  let mailOptions = {
    from: "hiddensierra1104@gmail.com",
    to: `${reminder.email}`,
    subject: `Reminder : ${reminder.name}`,
    text: `Hi ${user.name},
            
            You have scheduled a work to do now.
            "${reminder.description}"`,
  };

  const { reminderDate: d } = reminder;
  const job = schedule.scheduleJob(`${reminderId}`, d, () => {
    // Send e-mail
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log(
          `Email sent to ${reminder.email} regarding the reminder "${reminder.name}"`
        );
      }
    });
  });
};

const updateSchedule = async (reminderId) => {
  schedule.scheduledJobs[reminderId].cancel();
  addSchedule(reminderId);
};

const deleteSchedule = async (reminderId) => {
  schedule.scheduledJobs[reminderId].cancel();
};

module.exports.scheduleMail = scheduleMail;
module.exports.addSchedule = addSchedule;
module.exports.updateSchedule = updateSchedule;
module.exports.deleteSchedule = deleteSchedule;
