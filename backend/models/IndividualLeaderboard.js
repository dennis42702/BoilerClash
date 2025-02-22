const mongoose = require("mongoose");

const IndividualLeaderboardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    totalHours: { type: Number, default: 0 },  
    type: { type: String, enum: ["weekly", "monthly"], required: true }, 
    rank: { type: Number, default: null },
    topLocation: { type: mongoose.Schema.Types.ObjectId, ref: "building", default: null }
});

module.exports = mongoose.model("IndividualLeaderboard", IndividualLeaderboardSchema);
