const mongoose = require('mongoose');
//const { type } = require('os');

const data = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    Is_discontinued: Boolean,
    manufacturer_name: String,
    type: String,
    pack_size_label: String,
    short_composition1: String,
    short_composition2: String,
    stock_left: Number,
    effect_group: String,
  });

module.exports = mongoose.model("data",data);