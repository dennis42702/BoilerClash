BoilerClash

📌 Overview

This is the backend for BoilerClash, built with Node.js, Express, and MongoDB. The system tracks student study hours at Purdue University's libraries and study spots, manages leaderboards for individuals and colleges, and provides user authentication.

🚀 Features

User Authentication (Signup/Login)

Study Session Tracking (Start, Update Sessions)

Leaderboard System

Individual Weekly & Monthly Rankings

Building-Specific Rankings

College Rankings by Study Time

Building Information API (With geolocation & crowdedness data)

🛠️ Tech Stack

Node.js (Backend framework)

Express.js (Routing & API Handling)

MongoDB & Mongoose (Database & ODM)

bcrypt (Password Hashing)

cors & body-parser (Middleware for request handling)

📂 Project Structure

/backend
├── models/                # Mongoose schemas
│   ├── User.js            # User Schema
│   ├── Session.js         # Study Session Schema
│   ├── Building.js        # Building Schema
│   ├── BuildingData.js    # Building Information Schema
│
├── routes/                # API routes
│   ├── auth.js            # Authentication Routes
│   ├── session.js         # Study Session Routes
│   ├── leaderboard.js     # Leaderboard Routes
│   ├── buildings.js       # Building Info Routes
│
├── server.js              # Main server file
├── .env                   # Environment Variables
└── package.json           # Dependencies & Scripts

🛠 Setup Instructions

1️⃣ Clone the Repository

git clone https://github.com/dennis42702/BoilerClash.git
cd ./backend

2️⃣ Install Dependencies

npm install

3️⃣ Configure Environment Variables

Create a .env file in the root directory and add:

MONGO_URI=your_mongodb_connection_string
PORT=5003

4️⃣ Start the Server

node index.js

Server runs at: http://localhost:5003

🔌 API Endpoints

🛠 Authentication

Method

Endpoint

Description

POST

/signup

Register a new user

POST

/signup/details

Complete user details after signup

POST

/login

User login

🎓 User Profile

Method

Endpoint

Description

POST

/profile

Get user profile with rank

📖 Study Sessions

Method

Endpoint

Description

POST

/newSession

Create a new study session

POST

/updateSession

Update session end time

🏆 Individual Leaderboards

Method

Endpoint

Description

GET

/individualLeaderboard/weekly

Get top 20 users (weekly)

GET

/individualLeaderboard/monthly

Get top 20 users (monthly)

🏢 Building-Specific Leaderboards

Method

Endpoint

Description

POST

/buildingLeaderboard/individual/weekly

Top 10 users for a building (weekly)

POST

/buildingLeaderboard/individual/monthly

Top 10 users for a building (monthly)

POST

/buildingLeaderboard/college/weekly

Top 10 colleges for a building (weekly)

POST

/buildingLeaderboard/college/monthly

Top 10 colleges for a building (monthly)

🏛 Building Data

Method

Endpoint

Description

GET

/api/buildingData

Get list of buildings with metadata

🛠 Additional Functions

🔄 Reset Weekly & Monthly Study Hours

To reset weeklyStudyHours (Sunday 11:59 PM)

To reset monthlyStudyHours (Last day of the month 11:59 PM)

Can be automated using node-cron

💡 Future Enhancements

Live Study Session Tracking

More User Stats & Insights

Email Notifications for Leaderboards

📝 License

This project is open-source under the MIT License.

Contributor
Hosung Ryu
