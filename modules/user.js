const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    
    
    cn: String,
    title: String,
    company: {
        type: String,
        enum: "CyberArk"
    },
    location: {
        type: String,
        enum: "Gauteng"
    },

})


module.exports = mongoose.model("Accounts", UserSchema)