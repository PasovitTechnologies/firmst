const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  fullName: { type: String },
  phone: { type: String, required: true },
  specialization: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  acceptTerms: { type: Boolean, required: true },
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, default: "Uncontacted" },
  notes: { type: String, default: "" }
});

module.exports = mongoose.model("User", userSchema);
