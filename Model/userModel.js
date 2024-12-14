const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Define the schema for user data
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: String
});
userSchema.plugin(passportLocalMongoose);

// Export the User model
module.exports = mongoose.model("User", userSchema);