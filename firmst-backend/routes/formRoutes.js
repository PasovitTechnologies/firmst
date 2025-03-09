const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key";

// Path to store the user data (firmst-users.json)
const usersFilePath = path.join(__dirname, "../firmst-users.json");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from 'Authorization: Bearer <token>'

    if (!token) {
        return res.status(403).json({ message: "No token provided." }); // Unauthorized if token is missing
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token." }); // Unauthorized if the token is invalid or expired
        }
        req.user = decoded;  // Attach the decoded user information to the request
        next(); // Allow request to proceed to the next middleware or route handler
    });
};

// Route to handle form submission
router.post("/submit-form", (req, res) => {
    const { name, phone, specialization, email, acceptTerms } = req.body;

    // Log the received form data to verify that it's being sent properly
    console.log("Received form data:", req.body);

    // Check if any of the required fields are missing
    if (!name || !phone || !specialization || !email || acceptTerms === undefined) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const newFormData = {
        name,
        phone,
        specialization,
        email,
        acceptTerms,
        submittedAt: new Date().toISOString(),
        status: "Uncontacted",  // Default status
        notes: ""          // Default notes
    };

    // Read the existing data from the file
    fs.readFile(usersFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);  // Log error if reading fails
            return res.status(500).json({ message: "Error reading the file." });
        }

        // Parse the existing data or initialize an empty array if no data exists
        let formData = data ? JSON.parse(data) : [];

        // Log the existing form data to verify what's currently in the file

        // Add the new form data to the array
        formData.push(newFormData);

        // Save the updated data back to the JSON file
        fs.writeFile(usersFilePath, JSON.stringify(formData, null, 2), "utf8", (err) => {
            if (err) {
                console.error("Error saving the form data:", err);  // Log error if saving fails
                return res.status(500).json({ message: "Error saving the form data." });
            }

            // Log to confirm the data was saved
            console.log("User data saved successfully.");

            // Return a success response
            res.status(200).json({ message: "Form submitted successfully." });
        });
    });
});

// Route to get individual user details (secured)
router.get("/user-detail/:email", verifyToken, (req, res) => {
    const { email } = req.params;

    // Read the users data from the file
    fs.readFile(usersFilePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading the file." });
        }

        const formData = data ? JSON.parse(data) : [];
        const user = formData.find((user) => user.email === email);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user);
    });
});

// Update status and add notes
router.put("/user-detail/:email", verifyToken, (req, res) => {
    const { email } = req.params;
    const { status, notes, name, phone, specialization } = req.body;

    fs.readFile(usersFilePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading the file." });
        }

        const formData = data ? JSON.parse(data) : [];
        const userIndex = formData.findIndex(user => user.email === email);

        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found." });
        }

        // Update fields if provided
        if (status) formData[userIndex].status = status;
        if (notes) formData[userIndex].notes = notes;
        if (name) formData[userIndex].name = name;
        if (phone) formData[userIndex].phone = phone;
        if (specialization) formData[userIndex].specialization = specialization;

        fs.writeFile(usersFilePath, JSON.stringify(formData, null, 2), "utf8", (err) => {
            if (err) {
                return res.status(500).json({ message: "Error saving the user data." });
            }

            res.status(200).json(formData[userIndex]);
        });
    });
});

// Get all user data (secured)
router.get("/user-data", verifyToken, (req, res) => {
    fs.readFile(usersFilePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading the file." });
        }

        const formData = data ? JSON.parse(data) : [];
        res.status(200).json(formData);
    });
});

// Route to delete a user
router.delete("/user-detail/:email", verifyToken, (req, res) => {
    const { email } = req.params;

    // Read the users data from the file
    fs.readFile(usersFilePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading the file." });
        }

        let formData = data ? JSON.parse(data) : [];
        const userIndex = formData.findIndex(user => user.email === email);

        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found." });
        }

        // Remove the user from the array
        formData.splice(userIndex, 1);

        // Save the updated data back to the file
        fs.writeFile(usersFilePath, JSON.stringify(formData, null, 2), "utf8", (err) => {
            if (err) {
                return res.status(500).json({ message: "Error saving the user data." });
            }

            res.status(200).json({ message: "User deleted successfully." });
        });
    });
});

module.exports = router;
