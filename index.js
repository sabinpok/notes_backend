// Purpose: Main file for the backend server

// Importing the express module
const express = require("express");
const app = express();
require("dotenv").config();

// Importing the mongoose module
const Note = require("./models/note");

app.use(express.static("dist")); // Serve the static files in the dist folder

// Middleware functions designed to handle requests
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

// Middleware function to handle errors
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Middleware function to handle unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// Route handlers for base URL
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// Route handler to get all notes
app.get("/api/notes", (request, response) => {
  Note.find({
    /* some condition (currently none) */
  }).then((notes) => {
    response.json(notes);
  });
});

// Route handler to create a new note
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  // Create a new note object from the request body
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  // Save the note object to the database
  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

// Route handler to get a single note by ID
app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      // check if note exists
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error)); // passes error to the error handler if note is malformed
});

// Route handler to delete a note by ID
app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      // check if note was "successfully" deleted
      response.status(204).end();
    })
    .catch((error) => next(error)); // passes error to the error handler for any exceptions
});

// Route handler to update a note by ID
app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;
  // Create an object that IS NOT a mongoose object with the updated note
  const note = {
    content: body.content,
    important: body.important || false,
  };

  // findByIdAndUpdate method receives a regular JS object as the second argument
  // findByIdAndUpdate also would return the original document to updatedNote, not the updated one,
  // so we use the { new: true } option to call event handler with the updated document
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

// Middleware functions to handle unknown endpoints and errors
app.use(unknownEndpoint);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
