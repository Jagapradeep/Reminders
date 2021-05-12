const cron = require("node-cron");
const nodemailer = require("nodemailer");
const config = require("config");

const url_taskMap = {};

// e-mail message options
let mailOptions = {
  from: "hiddensierra1104@gmail.com",
  to: "jagkis1104@gmail.com",
  subject: "Email from Node-App: A Test Message!",
  text: "Some content to send",
};

// e-mail transport configuration
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hiddensierra1104@gmail.com",
    pass: `${config.get("mail-password")}`,
  },
});

const month = 5;
const day = 12;
const hour = 11;
let minute = 48;
url_taskMap["url"] = cron.schedule(
  `${minute} ${hour} ${day} ${month} *`,
  () => {
    // Send e-mail
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
);

minute = 49;
url_taskMap["lru"] = cron.schedule(
  `${minute} ${hour} ${day} ${month} *`,
  () => {
    // Send e-mail
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
);

url_taskMap["url"].stop();
//cron.schedule["Name"].stop();
