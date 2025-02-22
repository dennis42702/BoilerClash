const mongoose = require("mongoose");

const CollegeLeaderboardSchema = new mongoose.Schema({
    buildingId: { type: mongoose.Schema.Types.ObjectId, ref: "building", required: true },
    college: { type: String, required: true }, 
    totalHours: { type: Number, default: 0 },  
    type: { type: String, enum: ["weekly", "monthly"], required: true }, 
    rank: { type: Number, default: null } // 1 2 3 
});

module.exports = mongoose.model("CollegeLeaderboard", CollegeLeaderboardSchema);
