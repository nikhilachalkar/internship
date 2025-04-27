const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();

const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../models/user.js');
const Admin = require('../models/admin.js');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { fname,lname,mob,password,role,shopid,branch,address} = req.body;

  

  try {
    if(role == 'admin'){
      const hashedPassword = await bcrypt.hash(password, 10);
      let uniqueID;
      do {
        uniqueID = Array(5).fill()
          .map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.floor(Math.random() * 36)))
          .join('');
        const existing = await Admin.findOne({UniqueID: uniqueID });
        if (!existing) break;
      } while (true);

      const admin = new Admin({ fname,lname,mob,UniqueID:uniqueID, password: hashedPassword,role });
      await admin.save();
    }
    else{
      const hashedPassword = await bcrypt.hash(password, 10);
      let existing = await User.findOne({Mobile: mob });
        if (existing) {
            return res.status(404).json({ message: 'User already registered' });
        }
        else
        {
            const user = new User({ fname,lname,mob,shopid,branch, password: hashedPassword,address});
            await user.save();
        }
      
    }
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.post('/login', async (req, res) => {
  const { mob, password } = req.body;

  try {
    let user = await User.findOne({ mob });
    if (!user) 
    {  
      user= await Admin.findOne({mob}); 
    if (!user)
    {
      return res.status(404).json({ message: 'User not found' });
    }
    
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '4h' });


    res.cookie('token', token, {
      httpOnly: true, 
      secure: true, 
      sameSite: 'strict', 
      maxAge: 4* 60 * 60 * 1000, 
    });

    res.status(200).json({ role: user.role });
    console.log(user.role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
