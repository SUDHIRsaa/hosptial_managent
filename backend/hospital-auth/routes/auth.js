const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db'); 
const router = express.Router();

const secretKey = 'aay';

// Login route without the '/api' prefix
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT u.id, u.password, r.role_name FROM users u JOIN roles r ON u.role_id = r.id WHERE u.email = ?';

    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (result.length > 0) {
            const user = result[0];

            if (user.password === password) {
                const token = jwt.sign(
                    { id: user.id, role: user.role_name },
                    secretKey,
                    { expiresIn: '1h' }
                );

                return res.json({ token, role: user.role_name });
            } else {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

module.exports = router;
