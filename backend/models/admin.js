const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  First_Name: String,
  Last_Name : String,
  Mobile: Number,
  UniqueID: String,
  password: String,
  role:String
});


module.exports = mongoose.model('Admin', adminSchema);
