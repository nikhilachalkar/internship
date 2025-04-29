require('dotenv').config();
const express = require("express");
//const mongoose = require("mongoose");
const fs = require("fs");
const readline = require("readline");
const data = require("./models/data");
const authRoutes = require('./routes/auth.js');
const getalldata = require('./routes/getall.js');
const connectDB = require("./config/db");
//const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
const PORT = 3000;
// const medicalStockData= require('./stock').default;
// Middleware
//app.use(cors());
app.use(bodyParser.json());
app.get("/load-medicines", async (req, res) => {
  
  data.insertMany(medicalStockData);
});

app.use('/auth', authRoutes);
app.use('/api/',getalldata);
(async () => {
  await connectDB();

  

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
