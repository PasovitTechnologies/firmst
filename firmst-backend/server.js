require("dotenv").config(); // <-- Load .env first

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const formRoutes = require("./routes/formRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const port = process.env.PORT || 4004;

// MongoDB connection using MONGO_URI from .env
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("✅ Connected to MongoDB Atlas");
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/firmst-form", formRoutes);
app.use("/api/admin", adminRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
