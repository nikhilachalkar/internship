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
//Delete Medicine---
router.delete('/medicines/:id', async (req, res) => {
    try {
      const medicineId = req.params.id;
      const deletedMedicine = await Data.findByIdAndDelete(medicineId);
  
      if (!deletedMedicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
  
      res.status(204).send(); 
    } catch (error) {
      console.error('Error deleting medicine:', error);
      res.status(500).json({ message: 'Failed to delete medicine', error: error.message });
    }
  });
  
  //  EDIT MEDICINE 
  router.put('/medicines/:id', async (req, res) => {
    try {
      const medicineId = req.params.id;
      const updatedData = req.body; 
  
      const updatedMedicine = await Data.findByIdAndUpdate(medicineId, updatedData, { new: true });
  
      if (!updatedMedicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
  
      res.status(200).json(updatedMedicine);
    } catch (error) {
      console.error('Error updating medicine:', error);
      res.status(500).json({ message: 'Failed to update medicine', error: error.message });
    }
  });
  
//   //  ADD MEDICINE 
  router.post('/medicines', async (req, res) => {
    try {
      const newMedicineData = req.body;
      const newMedicine = new Data(newMedicineData);
      const savedMedicine = await newMedicine.save();
  
      res.status(201).json(savedMedicine); // 201 Created
    } catch (error) {
      console.error('Error adding medicine:', error);
      res.status(500).json({ message: 'Failed to add medicine', error: error.message });
    }
  });



module.exports = router;
