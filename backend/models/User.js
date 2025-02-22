const mongoose = require("mongoose");
const { isValidPassword } = require("mongoose-custom-validators");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique:true },
  username: { type: String, required: true, unique:true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: isValidPassword,
      message:
        "Password must have at least 10 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
    },
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  major: { type: String, required: true },
  dob: { type: Date, required: true },
  
});

module.exports = mongoose.model("user", UserSchema);



