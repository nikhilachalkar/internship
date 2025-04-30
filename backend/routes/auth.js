const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../models/user.js');
const Admin = require('../models/admin.js');

const router = express.Router();

// Route for user registration
router.post('/register/user', async (req, res) => {
    const { fname, lname, mob, password, shopid, branch, address } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let existing = await User.findOne({ Mobile: mob });
        if (existing) {
            return res.status(409).json({ message: 'User with this mobile number already exists' });
        } else {
            const user = new User({
                First_Name: fname,
                Last_Name: lname,
                Mobile: mob,
                ShopID: shopid,
                Branch: branch,
                password: hashedPassword,
                Address: address,
                Role: 'user'
            });
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route for admin registration
router.post('/register/admin', async (req, res) => {
    const { fname, lname, mob, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let uniqueID;
        do {
            uniqueID = Array(5).fill()
                .map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.floor(Math.random() * 36)))
                .join('');
            const existing = await Admin.findOne({ UniqueID: uniqueID });
            if (!existing) break;
        } while (true);

        const admin = new Admin({
            First_Name: fname,
            Last_Name: lname,
            Mobile: mob,
            UniqueID: uniqueID,
            password: hashedPassword,
            Role: 'admin'
        });
        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route for user login
router.post('/login/user', async (req, res) => {
  const { mob, password } = req.body;

  try {
      const user = await User.findOne({ Mobile: mob }); // Use 'Mobile' to match schema
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id, role: user.Role }, JWT_SECRET, { expiresIn: '4h' }); // Use 'Role'

      res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 4 * 60 * 60 * 1000,
      });

      res.status(200).json({
          role: user.Role,
          branchId: user.Branch, // Assuming 'Branch' is the field name in your User model
          mob: user.Mobile,     // Use 'Mobile' to match schema
          fname: user.FirstName  // Assuming 'FirstName' is the field name
          // Add any other user information you want to send to the frontend
      });
      console.log('User logged in:', user.Role, user.Branch, user.Mobile, user.FirstName);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
// Route for admin login
router.post('/login/admin', async (req, res) => {
    const { mob, password } = req.body;

    try {
        const admin = await Admin.findOne({ Mobile: mob }); // Use 'Mobile' to match schema
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id, role: admin.Role }, JWT_SECRET, { expiresIn: '4h' }); // Use 'Role'

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 4 * 60 * 60 * 1000,
        });

        res.status(200).json({ 
          role: admin.Role,
          uniqueID: admin.UniqueID }); // Use 'Role'
        console.log('Admin logged in:', admin.Role,admin.UniqueID);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;