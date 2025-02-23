require('dotenv').config();

//weekly monthly 

const UserModel = require('./models/User');
const SessionModel = require('./models/Session')
const BuildingModel = require('./models/Building')
const CollegeLeaderboardModel = require('./models/CollegeLeaderboard')
const BuildingLeaderboardModel = require('./models/BuildingLeaderboard')

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const app = express();
const PORT = process.env.PORT || 5003;


app.use(bodyParser.json());
app.use(cors());

const initializeBuildings = async () => {
  try {
    const existingBuildings = await BuildingModel.countDocuments();

    if (existingBuildings === 0) {
      console.log("No buildings found. Inserting default buildings...");

      await BuildingModel.insertMany([
        { buildingName: "WALC", conqueredByUser: null, conqueredByTeam: null, total_people: 0 },
        { buildingName: "HICKS", conqueredByUser: null, conqueredByTeam: null, total_people: 0 },
        { buildingName: "HAAS", conqueredByUser: null, conqueredByTeam: null, total_people: 0 },
        { buildingName: "DUDL", conqueredByUser: null, conqueredByTeam: null, total_people: 0 },
        { buildingName: "LMBS", conqueredByUser: null, conqueredByTeam: null, total_people: 0 },
        { buildingName: "LWSN", conqueredByUser: null, conqueredByTeam: null, total_people: 0 },
        { buildingName: "LILY", conqueredByUser: null, conqueredByTeam: null, total_people: 0 },
        { buildingName: "KRCH", conqueredByUser: null, conqueredByTeam: null, total_people: 0 },
        { buildingName: "CREC", conqueredByUser: null, conqueredByTeam: null, total_people: 0 },
        { buildingName: "STEW", conqueredByUser: null, conqueredByTeam: null, total_people: 0 },
        { buildingName: "KRAN", conqueredByUser: null, conqueredByTeam: null, total_people: 0 },
        { buildingName: "RAWL", conqueredByUser: null, conqueredByTeam: null, total_people: 0 }
      ]);

      console.log("Default buildings inserted.");
    } else {
      console.log("Buildings already exist. Skipping initialization.");
    }
  } catch (err) {
    console.error("Error initializing buildings:", err);
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");
    await initializeBuildings(); // Initialize buildings only if they don’t exist



  })
  .catch(err => console.error("MongoDB Connection Failed:", err));

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" })
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log("step 1 sign up complete");
    res.json({ success: true, message: "Step 1 complete", userId: newUser._id });


  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
});

app.post("/signup/details", async (req, res) => {
  try {
    const { userId, firstName, lastName, college, year, gender } = req.body;

    if (!userId || !firstName || !lastName || !college || !year || !gender) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Find the user using `userId`
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update user with Step 2 details
    user.firstName = firstName;
    user.lastName = lastName;
    user.college = college;
    user.year = year;
    user.gender = gender;
    await user.save();


    console.log("step 2 sign up complete");
    res.json({ success: true, message: "Signup completed successfully!" });

  } catch (err) {
    console.error("Signup Step 2 Error:", err);
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
});



app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email: email });


    // Generic error message to prevent enumeration
    const errorMessage = "Invalid email or password.";

    if (!user) {
      return res.status(401).json({ success: false, message: errorMessage });
    }

    // Compare hashed password with entered password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: errorMessage });
    }

    // Success login
    console.log("login successful");
    res.json({ success: true, message: "Login successful", userId: user._id });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});



app.post("/newSession", async (req, res) => {

  try {

    const { userId, buildingName, startTime, endTime } = req.body;
    console.log(typeof userId);


    if (!userId || !buildingName || !startTime || !endTime) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const building = await BuildingModel.findOne({ buildingName });
    if (!building) {
      return res.status(404).json({ success: false, message: "Building not found" });
    }

    const buildingId = building._id;
    parsedStartTime = new Date(startTime);
    parsedEndTime = new Date(endTime);

    console.log("endTime type", typeof endTime);
    console.log("startTime type", typeof startTime);
    console.log(endTime);
    console.log(startTime);

    const duration = (parsedEndTime - parsedStartTime) / (1000 * 60 * 60);
    console.log("se");
    if (duration < 0) {
      return res.status(400).json({ success: false, message: "Invalid end time. Must be after start time." });
    }

    const newSession = await SessionModel.create({
      buildingId, userId, startTime: parsedStartTime, endTime: parsedEndTime, duration,
      username: user.username,
    });
    console.log("new session created", newSession);

    user.weeklyStudyHours += duration;
    user.monthlyStudyHours += duration;
    await user.save();
    console.log(`Updated ${user.username}'s Study Hours by ${duration}`);


    res.status(201).json({ success: true, message: "Item created", sessionId: newSession._id, data: newSession }); //send sessionId;

  } catch (error) {
    console.error("Error in newSession:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

app.post("/updateSession", async (req, res) => {
  try {
    const { sessionId, endTime } = req.body;


    if (!sessionId || !endTime) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }


    const session = await SessionModel.findById(sessionId);

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    const userId = session.userId;   //??
    const sStartTime = session.startTime;
    console.log("utype: ", typeof sStartTime)
    console.log("utype: ", typeof endTime)
    const parsedEndTime = new Date(endTime);

    const duration = (parsedEndTime - sStartTime) / (1000 * 60 * 60);
    const previousEndTime = session.endTime;
    console.log(" update session duraton: ", duration);

    if (duration < 0) {
      return res.status(400).json({ success: false, message: "Invalid end time. Must be after start time." });
    }

    session.endTime = parsedEndTime;
    session.duration = duration;
    await session.save();

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const addedHours = (parsedEndTime - previousEndTime) / (1000 * 60 * 60);
    console.log(`Updated ${user.username}'s Study Hours by ${addedHours}`);
    if (addedHours < 0) {
      return res.status(400).json({ success: false, message: "Invalid end time. Must be after previous end time." });
    }

    user.weeklyStudyHours += addedHours;
    user.monthlyStudyHours += addedHours;
    await user.save();



    res.status(200).json({
      success: true,
      message: "Session updated successfully",
      updatedSession: session,
      addedHours: duration
    });


  } catch (error) {
    console.error("Error in updateSession:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});




app.get("/individualLeaderboard/weekly", async (req, res) => {
  try {
      const leaderboard = await UserModel.find()
          .sort({ weeklyStudyHours: -1 }) 
          .limit(20)
          .select("username weeklyStudyHours") 
          .lean();

      const topLocations = await SessionModel.aggregate([
          { 
              $match: { userId: { $in: leaderboard.map(user => user._id) } } 
          },
          { 
              $group: { 
                  _id: { userId: "$userId", buildingId: "$buildingId" }, 
                  totalDuration: { $sum: "$duration" } 
              }
          },
          { $sort: { totalDuration: -1 } }, 
          { 
              $group: { 
                  _id: "$_id.userId", // Group by userId to get the top building per user
                  topBuilding: { $first: "$_id.buildingId" }, 
                  totalDuration: { $first: "$totalDuration" }
              }
          },
          { 
              $lookup: { 
                  from: "buildings", 
                  localField: "topBuilding", 
                  foreignField: "_id", 
                  as: "buildingInfo"
              } 
          },
          { $unwind: "$buildingInfo" }, //  Convert array to object
          { 
              $project: { 
                  userId: "$_id", 
                  buildingName: "$buildingInfo.buildingName", 
                  totalDuration: { $round: ["$totalDuration", 3] }
              }
          }
      ]);

      //  Attach topLocation to leaderboard users
      leaderboard.forEach(user => {
          const location = topLocations.find(loc => String(loc.userId) === String(user._id));
          user.topLocation = location ? { name: location.buildingName, hours: location.totalDuration } : null;
      });

      //  Assign dynamic rank
      leaderboard.forEach((entry, index) => {
          entry.rank = index + 1;
      });

      res.json({ success: true, leaderboard });
  } catch (error) {
      res.status(500).json({ success: false, message: "Error retrieving leaderboard", error: error.message });
  }
});

app.get("/individualLeaderboard/monthly", async (req, res) => {
  try {
      const leaderboard = await UserModel.find()
          .sort({ monthlyStudyHours: -1 }) // ✅ Sort users by most study hours
          .limit(20) // ✅ Get top 20 users
          .select("username monthlyStudyHours") // ✅ Only fetch necessary fields
          .lean();

      const topLocations = await SessionModel.aggregate([
          { 
              $match: { userId: { $in: leaderboard.map(user => user._id) } }
          },
          { 
              $group: { 
                  _id: { userId: "$userId", buildingId: "$buildingId" }, 
                  totalDuration: { $sum: "$duration" }
              }
          },
          { $sort: { totalDuration: -1 } },
          { 
              $group: { 
                  _id: "$_id.userId",
                  topBuilding: { $first: "$_id.buildingId" }, 
                  totalDuration: { $first: "$totalDuration" }
              }
          },
          { 
              $lookup: { 
                  from: "buildings", 
                  localField: "topBuilding", 
                  foreignField: "_id", 
                  as: "buildingInfo"
              } 
          },
          { $unwind: "$buildingInfo" },
          { 
              $project: { 
                  userId: "$_id", 
                  buildingName: "$buildingInfo.buildingName", 
                  totalDuration: { $round: ["$totalDuration", 3] }
              }
          }
      ]);

      leaderboard.forEach(user => {
          const location = topLocations.find(loc => String(loc.userId) === String(user._id));
          user.topLocation = location ? { name: location.buildingName, hours: location.totalDuration } : null;
      });

      leaderboard.forEach((entry, index) => {
          entry.rank = index + 1;
      });

      res.json({ success: true, leaderboard });
  } catch (error) {
      res.status(500).json({ success: false, message: "Error retrieving leaderboard", error: error.message });
  }
});







app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

