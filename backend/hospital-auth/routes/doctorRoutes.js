const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.post('/add', (req, res) => { // Keep it as /add
  const {
    firstName, lastName, birthDate, age, gender, specialty, phone, email, address, bankDetails
  } = req.body;

  console.log('Received data:', req.body);  

  const query = `
    INSERT INTO doctors (firstName, lastName, birthDate, age, gender, specialty, phone, email, house, street, city, pincode, accountName, accountNumber, ifscCode, bankName) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`; 

  const values = [
    firstName, lastName, birthDate, age, gender, specialty, phone, email,
    address.house, address.street, address.city, address.pincode,
    bankDetails.accountName, bankDetails.accountNumber, bankDetails.ifscCode, bankDetails.bankName
  ];

  console.log('Values to be inserted:', values); 

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('SQL Error:', err);  
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    const doctorId = result.insertId;
    res.status(200).json({ message: 'Doctor added successfully', doctorId });
  });
});

module.exports = router;
