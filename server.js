// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 4500;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))



// HTML ROUTES
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});

// API ROUTES


app.get("/api/notes", (req, res) =>{
    res.db.json(notes)
})




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
