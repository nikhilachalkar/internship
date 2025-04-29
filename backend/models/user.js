const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  First_Name: String,
  Last_Name : String,
  Mobile: Number,
  ShopID: String,
  Branch: String,
  password: String,
  Address:String,
  Role:String

});

module.exports = mongoose.model('User', UserSchema);
