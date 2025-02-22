require('dotenv').config();

const UserModel = require('./models/User');
const SessionModel = require('./models/Session')
const BuildingModel = require('./models/Building')
const IndividualLeaderboardModel = require('./models/IndividualLeaderboard')
const MajorLeaderboardModel = require('./models/MajorLeaderboard')
const BuildingLeaderboardModel = require('./models/BuildingLeaderboard')

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Not required for React Native but useful for testing

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Failed:", err));

  app.post("/users", async (req, res) => {
    try {
      const newUser = new UserModel(req.body);
      await newUser.save();
      res.status(201).json({ message: "User saved", user: newUser });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));