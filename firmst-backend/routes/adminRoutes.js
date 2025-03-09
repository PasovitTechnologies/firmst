const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Dummy admin credentials (plaintext for now)
const adminCredentials = [
  { email: "studyabroad@firmst.tech", password: "qKbYUp7%Bc" },
  { email: "tech.admin@eafo.info", password: "79m@3Zw50[%FF0" }
];

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key"; // Store this in .env in production

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = decoded;
    next();
  });
};

// Admin login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const admin = adminCredentials.find(user => user.email === email && user.password === password);

  if (!admin) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  // Generate JWT token
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({ message: "Login successful.", token });
});

// Protected route (only accessible with valid token)
router.get("/users", authenticateJWT, (req, res) => {
  res.status(200).json({ message: "Welcome, Admin!", users: ["User1", "User2"] });
});

module.exports = router;
