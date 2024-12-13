const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
require("dotenv").config();

// Create the Express app
const app = express();
app.set("view engine", "ejs");

// Define the port for local testing
const PORT = 3000;

// Session setup
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Database connection
mongoose.connect("mongodb://localhost:27017/NoteDB", {
}).then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

/* ------------------------
   Models
------------------------ */

// Define the schema for user data
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: String
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

// Define the schema for post data
const postSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true },
    text: { type: String, required: true },
    creator: { type: String, required: true },
    upvotes: [{ type: String }],
    downvotes: [{ type: String }]
});
const Post = mongoose.model("Post", postSchema);

// Passport setup
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

/* ------------------------
   Views
------------------------ */

// Views are located in the "views" folder and rendered using EJS templates.

/* ------------------------
   Controllers
------------------------ */

// Home route (login and registration page)
app.get("/", (req, res) => res.render("index"));

// Login route
app.post("/login", (req, res) => {
    console.log("User " + req.body.username + " is attempting to log in");
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/note-vote");
            });
        }
    });
});

// Registration route with invite code validation
app.post("/register", (req, res) => {
    if (req.body.invitecode !== process.env.INVITE_CODE) {
        return res.status(400).send("Invalid invite code");
    }
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
            if (err) {
                console.log(err);
                res.redirect("/");
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/note-vote");
                });
            }
        }
    );
});

// Protected route for note-vote
app.get("/note-vote", async (req, res) => {
    if (req.isAuthenticated()) {
        const posts = await Post.find().sort({ user_id: 1 });
        res.render("note-vote", { user: req.user, posts });
    } else {
        res.redirect("/");
    }
});

// Logout route
app.get("/logout", (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect("/");
    });
});

// Handle adding a new post
app.post("/addpost", async (req, res) => {
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
});

// Handle upvoting a post
app.post("/upvote", async (req, res) => {
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
});

// Handle downvoting a post
app.post("/downvote", async (req, res) => {
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
});

/* ------------------------
   Start Server
------------------------ */
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
