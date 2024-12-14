const Post = require("../Model/postModel");

// Protected route for note-vote
const notevote = async (req, res) => {
    if (req.isAuthenticated()) {
        const posts = await Post.find().sort({ user_id: 1 });
        res.render("note-vote", { user: req.user, posts });
    } else {
        res.redirect("/");
    }
};

// Handle adding a new post
const addpost = async (req, res) => {
    if (!req.isAuthenticated()) return res.redirect("/");

    const { note } = req.body;
    if (!note) return res.status(400).send("Note content is required");

    try {
        const lastPost = await Post.findOne().sort({ user_id: -1 });
        const nextUserId = lastPost ? lastPost.user_id + 1 : 1;

        const newPost = new Post({
            user_id: nextUserId,
            text: note,
            creator: req.user.username,
            upvotes: [],
            downvotes: []
        });

        await newPost.save();
        res.redirect("/note-vote");
    } catch (error) {
        console.error("Error adding post:", error);
        res.status(500).send("Server error");
    }
};

// Handle upvoting a post
const upvote = async (req, res) => {
    if (!req.isAuthenticated()) return res.redirect("/");

    const { post_id } = req.body;
    try {
        const post = await Post.findOne({ user_id: parseInt(post_id, 10) });
        if (post) {
            const userEmail = req.user.username;
            if (post.upvotes.includes(userEmail)) {
                post.upvotes = post.upvotes.filter(email => email !== userEmail);
            } else {
                post.upvotes.push(userEmail);
                post.downvotes = post.downvotes.filter(email => email !== userEmail);
            }
            await post.save();
        }
        res.redirect("/note-vote");
    } catch (error) {
        console.error("Error upvoting post:", error);
        res.status(500).send("Server error");
    }
};

// Handle downvoting a post
const downvote = async (req, res) => {
    if (!req.isAuthenticated()) return res.redirect("/");

    const { post_id } = req.body;
    try {
        const post = await Post.findOne({ user_id: parseInt(post_id, 10) });
        if (post) {
            const userEmail = req.user.username;
            if (post.downvotes.includes(userEmail)) {
                post.downvotes = post.downvotes.filter(email => email !== userEmail);
            } else {
                post.downvotes.push(userEmail);
                post.upvotes = post.upvotes.filter(email => email !== userEmail);
            }
            await post.save();
        }
        res.redirect("/note-vote");
    } catch (error) {
        console.error("Error downvoting post:", error);
        res.status(500).send("Server error");
    }
};

module.exports = {
    notevote,
    addpost,
    upvote,
    downvote,
}