const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    buildingId: {type: mongoose.Schema.Types.ObjectId, ref: 'building', required: true },
    name: {type:String, required:true},
    startTime: { type: Date, required: true },  
    endTime: { type: Date, required: true }, 
    duration: { type: Number, required: true }, 
    location: { type: String, required: true },




});

module.exports  = mongoose.model("session", SessionSchema);

 