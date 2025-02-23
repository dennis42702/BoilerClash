const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    username: {type: String},
    buildingId: {type: mongoose.Schema.Types.ObjectId, ref: 'building', required: true },
    startTime: { type: Date, required: true },  
    endTime: { type: Date, required: true }, 
    duration: { type: Number, required: true }, 




});

module.exports  = mongoose.model("session", SessionSchema);

 