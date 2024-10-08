// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const db = require('./db');

// exports.register = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 8);
//   db.query('INSERT INTO users SET ?', { name, email, password: hashedPassword, role }, (error, results) => {
//     if (error) {
//       return res.status(500).send({ error: 'Server error' });
//     }
//     res.status(201).send({ message: 'User registered!' });
//   });
// };

// // Login user
// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
//     if (error || results.length == 0) {
//       return res.status(401).send({ message: 'User not found' });
//     }

//     const user = results[0];
//     const validPassword = await bcrypt.compare(password, user.password);

//     if (!validPassword) {
//       return res.status(401).send({ message: 'Incorrect password' });
//     }

//     const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });
//     res.send({ token, role: user.role });
//   });
// };
