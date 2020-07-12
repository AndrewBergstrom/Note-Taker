// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 4500;
const mainPath = path.join(__dirname, "/public")

// Sets up the Express app to handle data parsing
// =============================================================
app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));

// ROUTES
// =============================================================
app.get("/notes", (req, res)=>{
    res.sendFile(path.join(mainPath,"notes.html"));
});

app.get("/api/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", (req, res)=>{
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

// DEFAULTS TO HOME PAGE, PREVENTS USER FROM WRITING AN INVALID PATH.
// =============================================================
app.get("*", (req, res)=>{
    res.sendFile(path.join(mainPath, "index.html"));
});

//  NOTES SAVED INTO DB.JSON
// =============================================================
app.post("/api/notes", (req, res)=> {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNotes = req.body;
    let noteID = (savedNotes.length).toString();
    newNotes.id = noteID;
    savedNotes.push(newNotes);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("note saved to db.json: ", newNotes);
    res.json(savedNotes)
});

//  DELETES NOTE WITH ID FROM DB.JSON
// =============================================================
app.delete('/api/notes/:id', (req, res)=>{
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json","utf8"));
   console.log(savedNotes)
  

fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
res.json(savedNotes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

