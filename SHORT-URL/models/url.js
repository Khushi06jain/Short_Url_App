const mongoose=require("mongoose");

const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        required:true,
    },
    visitHistory:[{timestamp:{type:Number}}],
},
{timestamps:true});

const URL=mongoose.model("url",urlSchema);
module.exports=URL;

//visithistory ek array hai jiske ander timestamp hai or 
//hum dekh skte h kitne bje click hua tha