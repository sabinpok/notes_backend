/* 
    This file is used to store the handling of environmental variables.
    Other modules can import this file to access the environment variables.
*/

require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};
