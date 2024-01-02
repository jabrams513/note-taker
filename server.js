const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require("util");

// Turned fs writeFile into ASYNC function
const writeFile = util.promisify(fs.writeFile);
const loadNotes = require("./helpers/loadNotes.js")

// Used to create unique IDs
const uuid = require("./helpers/uuid.js");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// HTML ROUTES
// Landing Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
})

// Notes page after clicking Get Started
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
})

// GET
app.get("/api/notes", (req, res) => {
  loadNotes().then(notes => res.json(notes))
})

// POST
app.post("/api/notes", (req, res) => {
  loadNotes().then(notes => {
    const { title, text } = req.body
    const noteArray = [...notes, { title, text, id: uuid() }]
    writeFile("db/db.json", JSON.stringify(noteArray)).then(() => res.json({ msg: "ok" }))
  })
})

// DELETE
app.delete("/api/notes/:id", (req, res) => {
  loadNotes().then(oldNotes => {
    const filteredNotes = oldNotes.filter(note => note.id !== req.params.id)
    writeFile("db/db.json", JSON.stringify(filteredNotes)).then(() => res.json({ msg: "ok" }))
  })
})

// Listener to open port
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))