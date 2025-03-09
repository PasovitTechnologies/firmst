const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const formRoutes = require("./routes/formRoutes"); // Import the routes
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const port = 5000;

// Middlewares
app.use(bodyParser.json()); // To parse JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) if you are accessing from frontend running on a different port

// Use the routes defined in formRoutes.js
app.use("/api/firmst-form", formRoutes); // Prefix the route with "/api" (e.g., POST /api/submit-form)
app.use("/api/admin", adminRoutes); // Prefix the route with "/api/admin" (e.g., POST /api/admin/login)

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
