const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("./.env");
const mySqlPool = require("./config/db");
// const authRoutes = require("./routes/auth"); // Import the auth routes
// const patientRoutes = require("./routes/Patient"); // Import patient routes
// const doctorRoutes = require("./routes/doctorRoutes"); // Import doctor routes
const doctorRoutes = require("./routes/doctorRoute");
const patientRoutes = require("./routes/patientRoute");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./models/index");
// dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/doctors", doctorRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api", userRoutes);
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Error: " + err));
