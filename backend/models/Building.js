const mongoose = require("mongoose");

const BuildingSchema = new mongoose.Schema({
    name: {type:String, required:true},
    conqueredByUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, 
    conqueredByTeam: {type:String, required:true, default: null},
    total_people: {type:Number, default: 0}, //query sessions every like few minutes?
    


});
module.exports = mongoose.model("building", BuildingSchema);

