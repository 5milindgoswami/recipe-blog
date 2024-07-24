const mongoose = require("mongoose");
 const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: "This field is Required"
    },
    image:{
        type: String,
        required: "This field is Required"
    },
 })

 module.exports = mongoose.model("Category", categorySchema)