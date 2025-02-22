const mongoose = require("mongoose");

const BuildingSchema = new mongoose.Schema({
    name: {type:String, required:true},


});

const BuildingModel = mongoose.model("building", UserSchema);
module.exports = BuildingModel;
