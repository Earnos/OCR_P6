// Call security module password-validator
const passwordValidator = require("password-validator");
// Create schema for pasword-validator module
const schemaMdpValidator = new passwordValidator();

// Add properties to it
schemaMdpValidator
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

module.exports = (req, res, next) => {
  if (schemaMdpValidator.validate(req.body.password)) {
    next();
  } else {
    return res
      .status(400)
      .json({
        message: "Le mot de passe a besoin d'une auhentification forte"
      });
  }
};
