const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 3000

app.get("/", (req, res)=>{
    res.send("welcome world!!")
})


app.listen(port, () =>{
    console.log("Server started...")
})