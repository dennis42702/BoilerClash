require('dotenv').config();

const UserModel = require('./models/User');
const SessionModel = require('./models/Session')
const BuildingModel = require('./models/Building')
const IndividualLeaderboardModel = require('./models/IndividualLeaderboard')
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

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Failed:", err));

  app.post("/signup", async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({success:false, message: "All fields are required"})
        }

        const existingUser = await UserModel.findOne({email});
        if(existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword,
          });

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
      res.json({ success: true, message: "Login successful" });
  
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));