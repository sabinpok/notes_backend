const mongoose = require("mongoose"); // Importing the mongoose module

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
console.log("connecting to", url);

// Connecting to the MongoDB database
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// Defining the schema for the Note model
const noteSchema = new mongoose.Schema({
  content: {
    // Define specific validation rules for the content field
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
});

// Modifying the toJSON method of the schema to format the returned object
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Exporting the Note model
module.exports = mongoose.model("Note", noteSchema);
