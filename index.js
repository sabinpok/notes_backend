/*
  This file now only imports the actual application from app.js
  and starts the application.
  The Express app and the code taking care of the web server are
  separated. This makes the app easier to test and maintain.
*/

const app = require("./app"); // The Express app
const config = require("./utils/config");
const logger = require("./utils/logger");

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
