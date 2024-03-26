const mongoose = require("mongoose");

// CHECKING ARGUMENTS
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

// Automatically grabs the third argument from the command line
const password = process.argv[2];

// URL to connect to the MongoDB database
const url = `mongodb+srv://sabinrpok:${password}@cluster0.5p32csa.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to the MongoDB database
mongoose.set("strictQuery", false);
mongoose.connect(url);

// Define the schema for the note
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// Create a model for the note
const Note = mongoose.model("Note", noteSchema);

// // Create a new note object (Models are constructors for documents)
// const note = new Note({
//   content: "Currently learning Mongoose",
//   important: true,
// });

// // Save the note object to the database
// note.save().then((result) => {
//   // Can print out result object for debugging
//   console.log("note saved!");
//   mongoose.connection.close(); // If you don't close the connection, the program will hang
// });

// Fetch all notes from the database and print them to the console
Note.find({
  /* some condition */
}).then((result) => {
  result.forEach((note) => {
    console.log(note.content);
  });
  mongoose.connection.close();
});
// Note.find({important: true}).then((result) => { would only return important notes
