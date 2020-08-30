// NODEJS PACKAGES CALLS
const fs = require("fs")
const express = require("express")
const path = require("path")
const app = express()
// ESTABLISHES PORT WEBSITE/EXPRESS IS WORKING OFF OF
const PORT = process.env.PORT || 8080;
app.listen(PORT, function(){
    console.log("App is on PORT: " + PORT)
})
// ******************************************************************
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
// ******************************************************************
app.get("/", function(request, response){
    response.sendFile(path.join(__dirname, "./public/index.html"))
})
app.get("/notes", function(request, response){
    response.sendFile(path.join(__dirname, "./public/notes.html"))
})
app.get("/api/notes", function(request, response){
    response.sendFile(path.join(__dirname, "./db/db.json"))
})
// ******************************************************************
app.post("/api/notes", function(request, response){
    fs.readFile("./db/db.json", "utf-8", function(error, data){
        if (error) throw error;
        
        var savedNote = JSON.parse(data);
        var writingNote = request.body;
        writingNote.id = savedNote.length + 1;
        savedNote.push(writingNote)

        fs.writeFile("./db/db.json", JSON.stringify(savedNote), "utf-8", function(error){
            if (error) throw error;
            console.log("Saved!")
        })
    })
    response.send("Done!")
})
// ******************************************************************
app.delete("/api/notes/:id", function(request, response){
    var id = request.params.id
    fs.readFile("./db/db.json", "utf-8", function(error, data){
        if (error)throw error;

        var savedNote = JSON.parse(data)
        var deleteNote = savedNote.findIndex((x) => x.id == id)
        savedNote.splice(deleteNote, 1)

        fs.writeFile("./db/db.json", JSON.stringify(savedNote), "utf-8", function(error){
            if (error) throw error;
            console.log("Deleted!")
        })
    })
    response.send("Done!")
})
// ******************************************************************