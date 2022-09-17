const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// user shema
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Apply mongoose plugin on schema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
