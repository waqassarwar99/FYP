const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
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
    required: true
  },
  cnic: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  serviceType: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dwvualmxt/image/upload/v1653293779/avatars/vei0pi75yhaw2xdjksf2.png",
  },
});

module.exports = mongoose.model("Seller", sellerSchema);
