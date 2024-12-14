const User = require("../Model/userModel");
const passport = require("passport")

// Login route
const login = (req, res) => {
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
};

// Registration route with invite code validation
const register = (req, res) => {
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
};

// Logout route
const logout = (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect("/");
    });
};

module.exports = {
    login,
    register,
    logout
}