const mongoose = require("mongoose");

// Define the schema for post data
const postSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true },
    text: { type: String, required: true },
    creator: { type: String, required: true },
    upvotes: [{ type: String }],
    downvotes: [{ type: String }]
});

// Export the Post model
module.exports = mongoose.model("Post", postSchema);
