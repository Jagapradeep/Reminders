const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
const users = require("./routes/users");
const reminders = require("./routes/reminders");
const auth = require("./routes/auth");
const { scheduleMail } = require("./utils/scheduleReminder");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

const connectionString = `${config.get("db")}`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(" -info: Connected Successfully To mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());

app.use("/users", users);
app.use("/reminders", reminders);
app.use("/auth", auth);
scheduleMail();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(` -info: Listening on port ${port}`));
