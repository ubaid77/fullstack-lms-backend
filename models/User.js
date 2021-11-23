const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: [true, "User already exists!"],
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  user_type: {
    type: String,
    default: "STUDENT",
  },
  password: {
    type: String,
    required: true,
    minlength: [5, "Password must be of minimum 5 characters"],
  },
  courses_created: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
