/*
    This module is used to log information and errors to the console,
    separated from the actual application logic.
    Extracting the logging functionality into its own module is a good
    practice, as if we wanted to start writing logs or send them to an
    external logging service, we would only need to modify this module.
*/

// Prints normal log messages to the console
const info = (...params) => {
  console.log(...params)
}

// Prints error messages to the console
const error = (...params) => {
  console.error(...params)
}

/*
    This file exports an object that has two fields: info and error.
    The functions can be used either
        - by requiring the whole object and referring to the functions
          through it using dot notation
            - const logger = require("./utils/logger");
            - logger.info("This is an informative message");
        - by destructuring the object and using the functions directly
            - const { info, error } = require("./utils/logger");
            - info("This is an informative message");
*/
module.exports = {
  info,
  error
}
