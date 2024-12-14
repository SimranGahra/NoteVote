const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
require("dotenv").config();

// Import Controllers
const authController = require("./Controller/authController")
const postController = require("./Controller/postController")

// importing the user 
const User = require("./Model/userModel");
const Post = require("./Model/postModel");

// Define the port for local testing
const PORT = 3000;

// Create the Express app
const app = express();
app.set("view engine", "ejs");

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

// Passport setup
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Home route (login and registration page)
app.get("/", (req, res) => res.render("index"));

// POST this route for login and load posts
app.post("/login", authController.login);

// GET this route for home page
app.get("/note-vote", postController.notevote)

// POST this route for user registration
app.post("/register", authController.register )

// POST this route for adding post and rendering
app.post("/addpost", postController.addpost)

// GET this route for handling user logout
app.get('/logout', authController.logout)

// POST this route for handing upvoting a post and rendering
app.post("/upvote", postController.upvote)

// POST this route for handing downvoting a post and rendering
app.post("/downvote",  postController.downvote)

/* ------------------------
   Start Server
------------------------ */
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
