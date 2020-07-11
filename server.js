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

app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});




// API ROUTES


app.get("/api/notes", (req, res) =>{
    fs.readFile("./db/db.json" ,"utf8", function(err,data){
        if(err) throw err
        let savedData= JSON.parse(data)
        return res.json(savedData)
    })
    
})

app.post("/api/notes",function( req,res){
    let newData= req.body
    // console.log(newData);
    
    res.send(newData)

    
})

app.delete("api/notes/:id", function(req, res){

})


app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
