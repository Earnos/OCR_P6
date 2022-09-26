const mongoose = require("mongoose");
// Call security module password-validator
const passwordValidator = require("password-validator");
// Create schema for pasword-validator module
const schemaMdpValidator = new passwordValidator();

// Add properties to it
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(16) // Maximum length 16
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123, 12345678, 00000000"]); // Blacklist these values

module.exports = mongoose.model("mdpvalidator", schemaMdpValidator);
