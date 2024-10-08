const express = require('express');
const verifyToken = require('./authMiddleware'); 
const router = express.Router();


router.get('/dashboard', verifyToken, (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).send('Access Denied');
    }
    res.send('Welcome to the Admin Dashboard');
});


router.get('/doctors', verifyToken, (req, res) => {
    if (req.user.role !== 'Doctor') {
        return res.status(403).send('Access Denied');
    }
    res.send('Welcome to the Doctor\'s Page');
});


router.get('/patients/all', verifyToken, (req, res) => {
    if (req.user.role !== 'Receptionist') {
        return res.status(403).send('Access Denied');
    }
    res.send('Welcome to the Receptionist\'s Dashboard');
});

module.exports = router;
