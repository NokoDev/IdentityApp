const express = require("express")
const app = express()
const mongoose = require("mongoose")
const ejs = require("ejs")
const ejsMate = require("ejs-mate")


const Accounts =  require("./modules/user")

const port = 3000


mongoose.connect("mongodb://localhost:27017/UserAccount")
.then(()=>{
    console.log("DB Connection open...")
}).catch(err =>{
    console.log(`Something went wrong: ${error}`)
})
app.get("/", (req, res)=>{
    res.send("welcome world!!")
})

app.engine("ejs", ejsMate)


app.listen(port, () =>{
    console.log("Server started...")
})