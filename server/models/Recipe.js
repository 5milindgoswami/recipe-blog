const mongoose = require("mongoose");

const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
    "West Bengal", "Jammu & Kashmir"
  ];
 const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: "This field is Required"
    },
    description :{
        type: String,
        required: "This field is Required"
    },
    email:{
        type: String,
        required: "This field is Required"
    },
    ingredients :{
        type: Array,
        required: "This field is Required"
    },
    category:{
        type: [String],
        enum: ["Thai", "American","Chinese", "Mexican", "Indian"],
        required: "This field is Required"
    },
    image:{
        type: String,
        required: "This field is Required"
    },
    state: {
        type: String,
        enum: indianStates,
    },
    Username:{
        type: String,
        required: "This field is Required"
    },
 })

 recipeSchema.index({name:"text", description:"text"});

 module.exports = mongoose.model("Recipe", recipeSchema)