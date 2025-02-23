const mongoose = require("mongoose");

const IndividualMonthlyLeaderboardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    totalHours: { type: Number, default: 0 },  
    rank: { type: Number, default: null },
    topLocation: { type: mongoose.Schema.Types.ObjectId, ref: "building", default: null }
});

module.exports = mongoose.model("IndividualMonthlyLeaderboard", IndividualMonthlyLeaderboardSchema);
