const express = require('express');
const db = require('../db'); // Adjust the path as necessary
const multer = require('multer'); // For file uploads
const path = require('path');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Set the destination for file uploads

router.post('/add', upload.single('profileImage'), (req, res) => {
    const {
        fullName,
        middleName,
        lastName,
        dob,
        age,
        phone,
        email,
        address,
        gender,
        language,
        bloodGroup,
        existingId,
        pin,
    } = req.body;

    const profileImage = req.file ? req.file.filename : null; // Handle the uploaded file

    const sql = `INSERT INTO patients (full_name, middle_name, last_name, dob, age, phone, email, address, gender, language, blood_group, existing_id, pin, profile_image)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [fullName, middleName, lastName, dob, age, phone, email, address, gender, language, bloodGroup, existingId, pin, profileImage], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to add patient', error: err.message }); // More descriptive error message
        }
        res.status(201).json({ message: 'Patient added successfully', patientId: result.insertId });
    });
});

module.exports = router;
