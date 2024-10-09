const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./../models/userModel"); 

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id, user.role);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

 
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
  
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};


exports.protect = async (req, res, next) => {
 
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
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    const currentUser = await User.findByPk(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        message: "The user belonging to this token no longer exists.",
      });
    }

   
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token or token expired",
      error: error.message,
    });
  }
};


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
