const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import the auth routes
const patientRoutes = require('./routes/Patient'); // Import patient routes
const doctorRoutes = require('./routes/doctorRoutes'); // Import doctor routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json()); 

// Register routes without the 'api' prefix
app.use('/api/auth', authRoutes); 
app.use('/api/patients', patientRoutes); 
app.use('/api/doctors', doctorRoutes); // Prefixing doctorRoutes with /api/doctors

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
