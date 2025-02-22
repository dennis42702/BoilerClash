const mongoose = require("mongoose");

const MajorLeaderboardSchema = new mongoose.Schema({
    buildingId: { type: mongoose.Schema.Types.ObjectId, ref: "building", required: true },
    major: { type: String, required: true }, 
    totalHours: { type: Number, default: 0 },  
    type: { type: String, enum: ["weekly", "monthly"], required: true }, 
    rank: { type: Number, default: null } // 1 2 3 
});

module.exports = mongoose.model("majorLeaderboard", MajorLeaderboardSchema);
