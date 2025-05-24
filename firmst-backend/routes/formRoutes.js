const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const { TelegramApi } = require("./TelegramApi");


const JWT_SECRET = "your_jwt_secret_key";

// Middleware: Token verification
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided." });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid or expired token." });
    req.user = decoded;
    next();
  });
};

router.post("/submit-form", async (req, res) => {
  const {
    firstName,
    middleName = "",
    lastName,
    phone,
    specialization,
    email,
    acceptTerms,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !phone ||
    !specialization ||
    !email ||
    acceptTerms === undefined
  ) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");

  try {
    // Save to DB
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      fullName,
      phone,
      specialization,
      email,
      acceptTerms,
    });
    await newUser.save();

    
    // Prepare Telegram message
    const telegram = new TelegramApi();
    telegram.chat_id = "-4808391349"; // Your group chat ID
    telegram.text = `
📝 <b>НОВАЯ ФОРМА ЗАПОЛНЕНА</b>
━━━━━━━━━━━━
👤 <b>ФИО:</b> ${fullName}
📞 <b>Телефон:</b> ${phone}
📧 <b>Email:</b> ${email}
🎓 <b>Специализация:</b> ${specialization}
✅ <b>Согласие с условиями:</b> ${acceptTerms ? "Да" : "Нет"}
⏱️ <b>Дата и время:</b> ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}
━━━━━━━━━━━━
    `;


    await telegram.sendMessage();


    res.status(200).json({ message: "Form submitted successfully." });
  } catch (error) {
    console.error("Error during form submission:", error.message);
    res.status(500).json({ message: "Error processing form data." });
  }
});




// GET: User by email
router.get("/user-detail/:email", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// PUT: Update user
router.put("/user-detail/:email", verifyToken, async (req, res) => {
  try {
    const updates = req.body;

    if (updates.firstName || updates.middleName !== undefined || updates.lastName) {
      updates.fullName = [
        updates.firstName ?? "",
        updates.middleName ?? "",
        updates.lastName ?? "",
      ]
        .filter(Boolean)
        .join(" ");
    }

    const user = await User.findOneAndUpdate({ email: req.params.email }, updates, {
      new: true,
    });

    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error updating user." });
  }
});

// GET: All users
router.get("/user-data", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving users." });
  }
});

// DELETE: Remove user
router.delete("/user-detail/:email", verifyToken, async (req, res) => {
  try {
    const result = await User.deleteOne({ email: req.params.email });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user." });
  }
});

module.exports = router;
