require('dotenv').config();

//weekly monthly 

const UserModel = require('./models/User');
const SessionModel = require('./models/Session')
const BuildingModel = require('./models/Building')
const CollegeLeaderboardModel = require('./models/CollegeLeaderboard')
const BuildingLeaderboardModel = require('./models/BuildingLeaderboard')
const BuildingDataModel = require('./models/BuildingData')

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

const initializeBuildingData = async () => {
  try {
    const existingData = await BuildingDataModel.countDocuments();
    console.log(`Existing Building Data Count: ${existingData}`);

    if (existingData === 0) {
      console.log("No building data found. Inserting dataset...");

      const dataset = [
        {
          "id": "STEW",
          "coordinates": [
            { "latitude": 40.427869, "longitude": -86.913537 },
            { "latitude": 40.427869, "longitude": -86.912798 },
            { "latitude": 40.426816, "longitude": -86.912798 },
            { "latitude": 40.426816, "longitude": -86.913537 }
          ],
          "crowdedness": 0.88,
          "conquered": "Daniels School of Business",
          "image": "https://lh5.googleusercontent.com/p/AF1QipOYgVfG6wAEZtfAE1l1a7arX9WGRH1VSPffYviF=w426-h240-k-no"
        },
        {
          "id": "STEW",
          "coordinates": [
            { "latitude": 40.425438, "longitude": -86.913447 },
            { "latitude": 40.425438, "longitude": -86.911969 },
            { "latitude": 40.424672, "longitude": -86.911969 },
            { "latitude": 40.424672, "longitude": -86.913447 }
          ],
          "crowdedness": 0.4,
          "conquered": "College of Pharmacy",
          "image": "https://www.purdueforlife.org/app/uploads/Admissions-Reception-Desk.png"
        },
        {
          "id": "KRAN",
          "coordinates": [
            { "latitude": 40.42385, "longitude": -86.911272 },
            { "latitude": 40.42385, "longitude": -86.910506 },
            { "latitude": 40.4235, "longitude": -86.910506 },
            { "latitude": 40.4235, "longitude": -86.911272 }
          ],
          "crowdedness": 0.2,
          "conquered": "College of Science",
          "image": "https://032314424b.cbaul-cdnwnd.com/a475f2b7d303a4959f116aa9a1c9c5b1/200000002-9400f94010/contact-us.jpg?ph=032314424b"
        },
        {
          "id": "PMU",
          "coordinates": [
            { "latitude": 40.425461, "longitude": -86.910466 },
            { "latitude": 40.424567, "longitude": -86.910466 },
            { "latitude": 40.424567, "longitude": -86.911704 },
            { "latitude": 40.425461, "longitude": -86.911724 }
          ],
          "crowdedness": 0.4,
          "conquered": "Purdue Polytechnic",
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFISM_CpygBAUR-WepzFNw-735K_tjuYu98g&s"
        },
        {
          "id": "RAWL",
          "coordinates": [
            { "latitude": 40.42388, "longitude": -86.90925 },
            { "latitude": 40.42366, "longitude": -86.90925 },
            { "latitude": 40.42366, "longitude": -86.910215 },
            { "latitude": 40.42388, "longitude": -86.910215 }
          ],
          "crowdedness": 0.2,
          "conquered": "College of Engineering",
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtgxSG_I6vqC6Aid1Bk3G88FYL-214PXtFSw&s"
        },
        {
          "id": "LWSN",
          "coordinates": [
            { "latitude": 40.428163, "longitude": -86.91678 },
            { "latitude": 40.427424, "longitude": -86.91678 },
            { "latitude": 40.427424, "longitude": -86.917193 },
            { "latitude": 40.428163, "longitude": -86.917193 }
          ],
          "crowdedness": 0.1,
          "conquered": "College of Engineering",
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjVd0K8JfZHQpJih_iyx2bujwUTy8M6WJf3Q&s"
        },
        {
          "id": "CREC",
          "coordinates": [
            { "latitude": 40.4293, "longitude": -86.9219 },
            { "latitude": 40.427575, "longitude": -86.9219 },
            { "latitude": 40.427575, "longitude": -86.923 },
            { "latitude": 40.4293, "longitude": -86.923 }
          ],
          "crowdedness": 0.2,
          "conquered": "College of Liberal Arts",
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMBpKWG_v88m9-JOmb6vHBQbxuRis_sJP2Og&s"
        },
        {
          "id": "KRCH",
          "coordinates": [
            { "latitude": 40.427773, "longitude": -86.920796 },
            { "latitude": 40.427485, "longitude": -86.920796 },
            { "latitude": 40.427485, "longitude": -86.921602 },
            { "latitude": 40.427773, "longitude": -86.921602 }
          ],
          "crowdedness": 0.2,
          "conquered": "Exploratory Studies",
          "image": "https://www.sasaki.com/wp-content/uploads/2019/10/01-Krach_CornerView_2014_8789-1800x1200.jpg"
        },
        {
          "id": "BHEE",
          "coordinates": [
            { "latitude": 40.428804, "longitude": -86.912605 },
            { "latitude": 40.429173, "longitude": -86.911919 },
            { "latitude": 40.428474, "longitude": -86.911152 },
            { "latitude": 40.428076, "longitude": -86.911754 }
          ],
          "crowdedness": 0.2,
          "conquered": "College of Engineering",
          "image": "https://engineering.purdue.edu/ECE/Giving/BHEE/Spaces/graduate-wing/explorationgraduatewing-web.jpg"
        },
        {
          "id": "DUDL",
          "coordinates": [
            { "latitude": 40.428017, "longitude": -86.911917 },
            { "latitude": 40.428017, "longitude": -86.91078 },
            { "latitude": 40.42697, "longitude": -86.91078 },
            { "latitude": 40.42697, "longitude": -86.911917 }
          ],
          "crowdedness": 0.7,
          "conquered": "Purdue Polytechnic",
          "image": "https://polytechnic.purdue.edu/sites/default/files/Gateway-dedication-hero-featured.jpg"
        },
        {
          "id": "GRIS",
          "coordinates": [
            { "latitude": 40.426797, "longitude": -86.911143 },
            { "latitude": 40.426797, "longitude": -86.910581 },
            { "latitude": 40.426141, "longitude": -86.910581 },
            { "latitude": 40.426797, "longitude": -86.911143 }
          ],
          "crowdedness": 0.15,
          "conquered": "College of Science",
          "image": "https://engineering.purdue.edu/IE/aboutus/aboutus/facilities/images/ext-gris-fall"
        },
        {
          "id": "WTHR",
          "coordinates": [
            { "latitude": 40.426744, "longitude": -86.913568 },
            { "latitude": 40.426744, "longitude": -86.912587 },
            { "latitude": 40.426159, "longitude": -86.912587 },
            { "latitude": 40.426159, "longitude": -86.913568 }
          ],
          "crowdedness": 0.4,
          "conquered": "College of Science",
          "image": "https://live.staticflickr.com/2768/4427166189_2d5ba41c53_c.jpg"
        },
        {
          "id": "BRWN",
          "coordinates": [
            { "latitude": 40.426771, "longitude": -86.912427 },
            { "latitude": 40.426771, "longitude": -86.911242 },
            { "latitude": 40.426392, "longitude": -86.911242 },
            { "latitude": 40.426392, "longitude": -86.912427 }
          ],
          "crowdedness": 0.3,
          "conquered": "College of Science",
          "image": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=-8G3b-8Q3gB4kuwy5oIKDA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=172.70203&pitch=0&thumbfov=100"
        },
        {
          "id": "UNIV",
          "coordinates": [
            { "latitude": 40.425471, "longitude": -86.91534 },
            { "latitude": 40.425471, "longitude": -86.914953 },
            { "latitude": 40.425046, "longitude": -86.914953 },
            { "latitude": 40.425046, "longitude": -86.91534 }
          ],
          "crowdedness": 0.2,
          "conquered": "College of Liberal Arts",
          "image": "https://www.purdueforlife.org/app/uploads/Uni-Hall-Student-gathering-area-9-2023-1024x576.jpg"
        },
        {
          "id": "ME",
          "coordinates": [
            { "latitude": 40.428139, "longitude": -86.913594 },
            { "latitude": 40.428733, "longitude": -86.912647 },
            { "latitude": 40.428232, "longitude": -86.912121 },
            { "latitude": 40.427862, "longitude": -86.912875 }
          ],
          "crowdedness": 0.6,
          "conquered": "Purdue Polytechnic",
          "image": "https://engineering.purdue.edu/MECL/assets/building-short.jpg"
        },
        {
          "id": "SC",
          "coordinates": [
            { "latitude": 40.426794, "longitude": -86.914676 },
            { "latitude": 40.426794, "longitude": -86.913937 },
            { "latitude": 40.426239, "longitude": -86.913937 },
            { "latitude": 40.426239, "longitude": -86.914676 }
          ],
          "crowdedness": 0.8,
          "conquered": "College of Liberal Arts",
          "image": "https://live.staticflickr.com/3687/19049161634_34e1eb3791_b.jpg"
        }
      ];
      
      for (const data of dataset) {
        try {
          await BuildingDataModel.create(data);
          console.log(`Inserted: ${data.id}`);
        } catch (error) {
          console.error(`Error inserting ${data.id}: ${error.message}`);
        }
      }
    } else {
      console.log("Building dataset already exists. Skipping initialization.");
    }
  } catch (err) {
    console.error("Error initializing building dataset:", err);
  }
};


mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");
    await initializeBuildings(); // Initialize buildings only if they don’t exist
    await initializeBuildingData(); // Initialize building data only if it doesn’t exist



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
      console.log("its minus")
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
    console.log(`new session:Updated ${user.username}'s Study Hours by ${duration}`);


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
      console.log("its minus")
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
    console.log(`update session: Updated ${user.username}'s Study Hours by ${addedHours}`);
    if (addedHours < 0) {
      console.log("its minus")
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
          .select("username weeklyStudyHours college") 
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
          .select("username monthlyStudyHours college") // ✅ Only fetch necessary fields
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


app.get("/buildingLeaderboard/individual/weekly", async (req, res) => {
  try {
    const leaderboardByBuilding = await SessionModel.aggregate([
      {
        $group: {
          _id: { buildingId: "$buildingId", userId: "$userId" }, // Group by building + user
          totalDuration: { $sum: "$duration" } // Sum total time per user in each building
        }
      },
      {
        $sort: { "_id.buildingId": 1, totalDuration: -1 } // Sort by building & study time
      },
      {
        $lookup: {
          from: "users", // Join with Users collection
          localField: "_id.userId",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" }, // Convert array to object
      {
        $lookup: {
          from: "buildings", // Join with Buildings collection
          localField: "_id.buildingId",
          foreignField: "_id",
          as: "buildingInfo"
        }
      },
      { $unwind: "$buildingInfo" },
      {
        $project: {
          _id: 0,
          buildingId: "$_id.buildingId",
          buildingName: "$buildingInfo.buildingName",
          username: "$userInfo.username",
          college: "$userInfo.college", // ✅ Fetch College
          totalDuration: { $round: ["$totalDuration", 3] } // ✅ Round hours
        }
      },
      {
        $group: {
          _id: "$buildingName",
          topUsers: { $push: "$$ROOT" } // ✅ Push all users into an array per building
        }
      },
      {
        $project: {
          _id: 0,
          buildingName: "$_id",
          topUsers: { $slice: ["$topUsers", 10] } // ✅ Limit to top 10 users per building
        }
      }
    ]);

    res.json({ success: true, leaderboard: leaderboardByBuilding });

  } catch (error) {
    console.error("Error fetching building leaderboard:", error);
    res.status(500).json({ success: false, message: "Error retrieving leaderboard", error: error.message });
  }
});

app.get("/buildingLeaderboard/individual/monthly", async (req, res) => {
  try {
    const leaderboardByBuilding = await SessionModel.aggregate([
      {
        $group: {
          _id: { buildingId: "$buildingId", userId: "$userId" }, // Group by building + user
          totalDuration: { $sum: "$duration" } // Sum total time per user in each building
        }
      },
      {
        $sort: { "_id.buildingId": 1, totalDuration: -1 } // Sort by building & study time
      },
      {
        $lookup: {
          from: "users", // Join with Users collection
          localField: "_id.userId",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" }, // Convert array to object
      {
        $lookup: {
          from: "buildings", // Join with Buildings collection
          localField: "_id.buildingId",
          foreignField: "_id",
          as: "buildingInfo"
        }
      },
      { $unwind: "$buildingInfo" },
      {
        $project: {
          _id: 0,
          buildingId: "$_id.buildingId",
          buildingName: "$buildingInfo.buildingName",
          username: "$userInfo.username",
          college: "$userInfo.college", // ✅ Fetch College
          totalDuration: { $round: ["$totalDuration", 3] } // ✅ Round hours
        }
      },
      {
        $group: {
          _id: "$buildingName",
          topUsers: { $push: "$$ROOT" } // ✅ Push all users into an array per building
        }
      },
      {
        $project: {
          _id: 0,
          buildingName: "$_id",
          topUsers: { $slice: ["$topUsers", 10] } // ✅ Limit to top 10 users per building
        }
      }
    ]);

    res.json({ success: true, leaderboard: leaderboardByBuilding });

  } catch (error) {
    console.error("Error fetching building leaderboard:", error);
    res.status(500).json({ success: false, message: "Error retrieving leaderboard", error: error.message });
  }
});

// Get all buildings
app.get("/api/buildingData", async (req, res) => {
  try {
    const buildings = await BuildingDataModel.find();
    res.json({ success: true, buildings });
  } catch (err) {
    console.error("Error fetching buildings:", err);
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

