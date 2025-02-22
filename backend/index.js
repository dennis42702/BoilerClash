require('dotenv').config();

const UserModel = require('./models/User')
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));