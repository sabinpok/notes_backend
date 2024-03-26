// Purpose: This file is the entry point of the application. It contains the server configuration and the routes for the application.
require("dotenv").config(); // This line is used to read the environment variables from the .env file

// Import the express module
const express = require("express");
const app = express();

// Import the Note model
const Note = require("./models/note");

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// Serve the static files in the dist directory
app.use(express.static("dist"));

// Middleware functions
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Middleware function to handle unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// Route to get the root of the application
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// Route to get all notes
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// Function to generate a new id for a note
// const generateId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

// Route to create a new note
app.post("/api/notes", (request, response) => {
  const body = request.body;

  // Check if the content field is missing
  if (body.content === undefined || !body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  // Create a new note object
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  // Add the new note object to the notes database
  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

// Route to get a single note
app.get("/api/notes/:id", (request, response) => {
  // Mongoose .findById method finds a single document by its _id field
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

// Route to delete a single note
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.use(unknownEndpoint);

// Define the port the application will listen on
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
