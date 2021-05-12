let cron = require("node-cron");
let nodemailer = require("nodemailer");

// e-mail message options
let mailOptions = {
  from: "jagkis1104@gmail.com",
  to: "jagapradeep1104@gmail.com",
  subject: "Email from Node-App: A Test Message!",
  text: "Some content to send",
};

// e-mail transport configuration
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jagkis1104@gmail.com",
    pass: "gGjAkI1104@",
  },
});

const month = 5;
const day = 11;
const hour = 22;
const minute = 39;
cron.schedule(`${minute} ${hour} ${day} ${month} *`, () => {
  // Send e-mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});
