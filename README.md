# Reminders

---

## INTRODUCTION

- This is a backend module for scheduling reminders.
- User can register themselves and set reminders.
- Email would be sent to the user at the specified reminder Date and Time.

## TECHNOLOGIES USED

- Node JS,Express JS and Mongo DB as the backend.
- For sending email - nodemailer.
- For scheduling emails - node-schedule.

## REQUIREMENTS

- Download and install MongoDB in your system and set the environment variables.
- Download MongoDB Compass.
- Open your command prompt and run the command `mongod`.
- MongoDB server will be running after executing the command.
- Download the code or clone it into your system.
- Run `npm i` to download all required node modules.
- At last run `node index.js`.
- If node is not installed in your system install it.

## API ENDPOINTS

1. There are actually two modules.
   - User
   - Reminder

### USER

| METHOD | ROUTE                                          |
| ------ | ---------------------------------------------- |
| GET    | `http://localhost:{PortNumber}/users`          |
| GET    | `http://localhost:{PortNumber}/users/{userID}` |
| POST   | `http://localhost:{PortNumber}/users`          |
| PUT    | `http://localhost:{PortNumber}/users/{userID}` |
| DELETE | `http://localhost:{PortNumber}/users/{userID}` |

### REMINDER

| METHOD | ROUTE                                                  |
| ------ | ------------------------------------------------------ |
| GET    | `http://localhost:{PortNumber}/reminders`              |
| GET    | `http://localhost:{PortNumber}/reminders/{reminderID}` |
| POST   | `http://localhost:{PortNumber}/reminders`              |
| PUT    | `http://localhost:{PortNumber}/reminders/{reminderID}` |
| DELETE | `http://localhost:{PortNumber}/reminders/{reminderID}` |

- Note : The `POST` `PUT` and `DELETE` routes of Reminder requires authenticating token `x-auth-token`.

## LICENSE & COPYRIGHT

© Jagapradeep G
