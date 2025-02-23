const mongoose = require("mongoose");

const BuildingDataSchema = new mongoose.Schema({
  id: { type: String, required: true },
  coordinates: [
    {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  ],
  crowdedness: { type: Number, required: true },
  conquered: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("BuildingData", BuildingDataSchema);
