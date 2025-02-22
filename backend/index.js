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
const bcrypt = require("bcrypt");
const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors()); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Failed:", err));

  app.post("/signup", async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await UserModel.create({ ...req.body, password: hashedPassword });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }); 





app.listen(PORT, () => console.log(`Server running on port ${PORT}`));