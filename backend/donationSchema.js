const mongoose = require("mongoose"); // node plugin for mongoose odm to make mongodb accessible via js
//defining the collection of donations as a schema
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
  donationTime:{
    type: Date,
    default:Date.now()
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
//export this file as mongoose model Donation
module.exports = mongoose.model("Donation", donationSchema);
