const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Automatically grabs the third argument from the command line
// const password = process.argv[2];

// URL to connect to the MongoDB database
const url = process.env.MONGODB_URI;
console.log("connecting to", url);

// Connect to the MongoDB database
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// Define the schema for the note
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// Transform the object returned by Mongoose
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Create a model for the note
module.exports = mongoose.model("Note", noteSchema);
