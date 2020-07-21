const mongoose = require("mongoose");
const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
  },
  isDonorVerified: {
    type: Boolean,
    default: false,
  },
  donorRating: {
    type: Number,
    default: 3,
    required: true,
  },
  donorPic: {
    type: String,
    default: "",
    required: true,
  },
  latLocation: {
    type: String,
    required: true,
  },
  longLocation: {
    type: String,
    required: true,
  },
  dishName: {
    type: String,
    required: true,
  },
  isVeg: {
    type: Boolean,
    default: true,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  givenTo: {
    type: String,
    default: "",
  },
  listOfUsersInterested: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Donation", donationSchema);
