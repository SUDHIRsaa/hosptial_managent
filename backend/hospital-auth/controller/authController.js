const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./../models/userModel"); // Assuming User model is in the models folder

// Helper function to create a JWT token
const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Function to create and send JWT token to the user
const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d", // Set a default expiration if not provided
  });

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// POST: Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  // 1) Check if email and password exist
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ where: { email } });
    console.log(user.dataValues.password, 11);

    if (!user || !(await bcrypt.compare(password, user.dataValues.password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // 3) If everything is okay, send token to the client
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Middleware: Protect routes (check if user is logged in)
exports.protect = async (req, res, next) => {
  // 1) Get token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "You are not logged in! Please log in to access." });
  }

  try {
    // 2) Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if the user still exists
    const currentUser = await User.findByPk(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        message: "The user belonging to this token no longer exists.",
      });
    }

    // 4) Grant access to the protected route
    req.user = currentUser; // Attach the user to the request object
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token or token expired",
      error: error.message,
    });
  }
};

// Middleware: Restrict access to certain roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    roles = ["admin", "doctor", "front_desk"];
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to perform this action" });
    }
    next();
  };
};
