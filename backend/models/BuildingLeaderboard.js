const mongoose = require("mongoose");

const BuildingLeaderboardSchema = new mongoose.Schema({
    buildingId: { type: mongoose.Schema.Types.ObjectId, ref: "building", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    totalHours: { type: Number, default: 0 },  
    type: { type: String, enum: ["weekly", "monthly"], required: true }, 
    rank: { type: Number, default: null }
});

module.exports = mongoose.model("buildingLeaderboard", BuildingLeaderboardSchema);
