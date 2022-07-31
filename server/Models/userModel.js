const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name."],
    maxlength: [30, "Name cannot exceed 30 characters."],
    minlength: [4, "Name should have more than 4 character."],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter your Password."],
    minlength: [8, "Password should be greater than 8 characters."]
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dwvualmxt/image/upload/v1653293779/avatars/vei0pi75yhaw2xdjksf2.png",
  },
  role: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
