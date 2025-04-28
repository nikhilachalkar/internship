const express = require('express');

require('dotenv').config();


const verifyToken= require('../middlewares/auth.js');

const Data = require('../models/data.js');

const router = express.Router();

router.get('/getalldata', async (req, res) => {
  
    try
    {
    const data =await Data.find({});
    res.status(200).json(data); 
    }
    catch(error)
    {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});



module.exports = router;
