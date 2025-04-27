require('dotenv').config();
const express = require("express");
//const mongoose = require("mongoose");
const fs = require("fs");
const readline = require("readline");
const data = require("./models/data");
const connectDB = require("./config/db");
//const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
const PORT = 3000;
const medicalStockData= require('./clean_medical_stock');
// Middleware
//app.use(cors());
app.use(bodyParser.json());
app.get("/load-medicines", async (req, res) => {
  
  data.insertMany(medicalStockData);
});

// Main function
(async () => {
  await connectDB();

  

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
